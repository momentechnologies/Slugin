const jobDefinition = require('./' + process.argv[2]);

const done = error => {
    if (error) {
        console.error(error);
    }
    process.exit();
    console.log(`Task ${process.argv[2]} is done`);
};

setTimeout(() => {
    jobDefinition
        .job()
        .then(() => done())
        .catch(error => done(error));
}, 2000);
