const {
    jwt, bcrypt, typeHtml, typeJson, statusOk, statusForbidden, statusError, DBService, SECRET, token
} = require('../constant');

function getUserEmail(req, res) {
    let email = req.user.email;
    if (email) {
        res.setHeader("Content-Type", typeHtml);
        res.statusCode = statusOk;
        res.end('Email: ' + email);
    } else {
        res.statusCode = statusForbidden;
        res.end();
    }
}

function checkToken(req, res, next) {
    try {
        let token = req.cookies['token'];
        const payload = jwt.verify(token, SECRET);
        let email = payload.email;
        DBService.getUserByEmail(email)
            .then(result => {
                if (result) {
                    res.statusCode = statusOk;
                    req.user = {'email': email};
                    next();
                } else {
                    res.statusCode = statusForbidden;
                    res.end('Bad user credential');
                }
            })
            .catch(() => {
                setStatusError(res, 'Error');
            });
    } catch (err) {
        res.statusCode = statusForbidden;
        res.end();
    }
}

function getCryptPassword(req, res) {
    res.setHeader("Content-Type", typeHtml);
    if (req.query.password) {
        let password = req.query.password;
        let hash = bcrypt.hashSync(password, saltRounds);
        res.statusCode = statusOk;
        res.end(hash);
    } else {
        res.statusCode = statusError;
        res.end('Not set password');
    }
}

function getLogin(req, res) {
    res.setHeader("Content-Type", typeJson);
    if (req.body.login && req.body.password) {
        let email = req.body.login;
        let password = req.body.password;
        DBService.getUserByEmail(email)
            .then(result => {
                if (result && bcrypt.compareSync(password, result.password)) {
                    res.cookie('token', token, {path: '/', encode: String});
                    res.end(JSON.stringify({'status': 'logged'}));
                } else {
                    res.statusCode = statusForbidden;
                    res.end(JSON.stringify({'status': 'error'}));
                }
            })
            .catch(() => {
                res.statusCode = statusForbidden;
                res.end(JSON.stringify({'status': 'error'}));
            });
    } else {
        res.statusCode = statusForbidden;
        res.end(JSON.stringify({'status': 'error'}));
    }
}

function setStatusError(res, err) {
    res.statusCode = statusError;
    res.end(err);
}

module.exports = {
    getUserEmail,
    checkToken,
    getCryptPassword,
    getLogin,
};
