// this is middleware

export default (error, req, res, next) => {
    console.log('time: ', Date.now());
    if (error) {
        console.error(`message: ${error.message}`);
    } else if (req) {
        console.log(`method: ${req.method}, host: ${req.host}, path: ${req.path}`);
    } else if (res) {
        console.log(`status: ${res.statusCode}, message: ${res.statusMessage}`);
    }

    next();
} // TODO: write to files. For example requests.log