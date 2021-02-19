const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, 'api/cronTasks');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const jobs = [];
    files.forEach(file => {
        // Do whatever you want to do with the file
        const isDirectory = fs
            .lstatSync(path.join(directoryPath, file))
            .isDirectory();

        if (!isDirectory) {
            return;
        }

        const job = require('./api/cronTasks/' + file);

        if (job.deactivated) {
            return;
        }

        jobs.push({
            scriptName: file,
            schedule: job.schedule,
        });
    });

    const template = fs
        .readFileSync(path.join(__dirname, 'kubernetes/cronTemplate.yml'))
        .toString();

    const jobsFileContent = jobs
        .map(j =>
            template
                .replace('{{schedule}}', j.schedule)
                .replace(
                    new RegExp('{{scriptNameLowerCase}}', 'g'),
                    j.scriptName.toLowerCase()
                )
                .replace(new RegExp('{{scriptName}}', 'g'), j.scriptName)
        )
        .join('\n---\n');

    fs.writeFileSync(
        path.join(__dirname, 'generated_jobs.yml'),
        jobsFileContent
    );

    console.log('summary: ');
    console.log(jobs.map(j => `${j.scriptName} - ${j.schedule}`));
});
