module.exports = (app) => {
    //404
    app.use(function (req, res, next) {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('errors/404');
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    });

    //500
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).render('errors/500');
    });
    return app;
};