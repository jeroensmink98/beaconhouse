export default {
    puppeteerOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    server: {
        open: false,
    },
    cache: false,
    hooks: {
        'worker-finished': async () => {
            process.exit(0);
        }
    }
}