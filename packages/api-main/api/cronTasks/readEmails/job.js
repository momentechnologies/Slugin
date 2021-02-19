var IMap = require('imap');
const simpleParser = require('mailparser').simpleParser;
const processEmail = require('./processEmail');

const connect = (err, cb) => {
    return new Promise((resolve, reject) => {
        var imap = new IMap({
            user: 'all@mail.slugin.io',
            password: 'Max241093',
            host: 'box.mail.slugin.io',
            port: 993,
            tls: true,
        });

        imap.once('ready', () => resolve(imap));
        imap.once('error', err => reject(err));
        imap.connect();
    });
};

const openBox = async (imap, boxName) => {
    return new Promise((resolve, reject) => {
        // (Open read-write)
        imap.openBox(boxName, false, function(err, box) {
            err ? reject(err) : resolve(box);
        });
    });
};

async function search(imap, criteria) {
    return new Promise((resolve, reject) => {
        imap.search(criteria, function(err, uids) {
            err ? reject(err) : resolve(uids);
        });
    });
}

const getEmail = (imap, box, id) => {
    return new Promise((resolve, reject) => {
        const f = imap.fetch([id], {
            bodies: '',
        });

        f.on('message', function(msg, seqno) {
            msg.on('body', function(stream, info) {
                let original = '';

                stream.on('data', function(chunk) {
                    original += chunk.toString('utf8');
                });

                stream.once('end', function() {
                    simpleParser(original, (err, mail) => {
                        resolve({
                            ...mail,
                            id,
                            raw: original,
                        });
                    });
                });
            });
        });
        f.once('error', function(err) {
            reject(err);
        });
        f.once('end', function() {});
    });
};

const getEmails = (imap, box, msgIds) => {
    return new Promise((resolve, reject) => {
        console.log(msgIds.length + ' message(s) found!');
        if (msgIds.length === 0) {
            return resolve([]);
        }

        Promise.all(msgIds.map(id => getEmail(imap, box, id)))
            .then(resolve)
            .catch(reject);
    });
};

async function trash(imap, msgId) {
    await new Promise((resolve, reject) => {
        imap.setFlags([msgId], ['\\Deleted'], function(err) {
            err ? reject(err) : resolve();
        });
    });
}

module.exports = async () => {
    const imap = await connect();
    try {
        const box = await openBox(imap, 'INBOX');
        const ids = await search(imap, ['!DELETED']);
        const emails = await getEmails(imap, box, ids);

        await Promise.all(
            emails.map(async email => {
                await processEmail(imap, email);
                await trash(imap, email.id);
            })
        );
    } catch (e) {
        console.error(e);
    }

    imap.end();
};
