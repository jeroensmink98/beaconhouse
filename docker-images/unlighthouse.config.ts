/// <reference types="unlighthouse" />
import { defineConfig } from 'unlighthouse'

export default {
    puppeteerOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    server: {
        open: false,
    },
    debug: true,
    ci: {
        buildStatic: true
    },
    cache: false,
    hooks: {
        // Task completed
        'task-completed': async (task) => {
            console.log(`Task completed: ${task.url}`);
        },

        // Exit the node process when the worker is finished
        'worker-finished': async () => {
            process.exit(0);
        },
    }

}