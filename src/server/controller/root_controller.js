const {
    fs, typeHtml, statusOk, statusNotFound, textNotFound, mainHtml, publicDirName, templateNotFound
} = require('../constant');


function serveSPA(req, res) {
    res.setHeader("Content-Type", typeHtml);
    try {
        const content = fs.readFileSync(mainHtml).toString();
        res.statusCode = statusOk;
        res.end(content);
    } catch (err) {
        serveNotFound(res);
    }
}

function serveNotFound(req, res) {
    res.setHeader("Content-Type", typeHtml);
    res.statusCode = statusNotFound;
    const content = fs.readFileSync(publicDirName + templateNotFound).toString();
    const template = ejs.compile(content);
    const scope = {textNotFound};
    res.end(template(scope));
}

module.exports = {
    serveSPA,
};
