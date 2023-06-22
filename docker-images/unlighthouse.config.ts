import childProcess from 'child_process';

export default {
    puppeteerOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    server: {
        open: false,
    },
    ci: {
        buildStatic: true
    },
    cache: false,
    hooks: {
        // Task completed
        'task-completed': async (task) => {
            console.log(`Task completed: ${task.url}`);
            // Run a command
            const child = childProcess.spawn('echo', ['Hello, world!'], {
                detached: true,
                stdio: 'inherit'  // change this to 'inherit' if you want to see the command output
            });
            child.unref();
        },

        // Exit the node process when the worker is finished
        'worker-finished': async () => {
            process.exit(0);
        },
    }

}