import dotenv from 'dotenv'

dotenv.config();
let server;

const unexpectedErrorHandler = (error) => {
    console.log(error);
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

export default (app) => {
    let PORT = process.env.PORT || 5000;
    server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
    process.on('SIGTERM', () => {
        logger.info('SIGTERM received');
        if (server) {
            server.close();
        }
    });
}
