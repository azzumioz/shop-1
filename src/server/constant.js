const fs = require('fs');
const ejs = require("ejs");
const express = require('express');
const DBService = require("../DBService.js");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jsonBodyParser = bodyParser("json");
const pathRoot = '/';
const pathProduct = "/product";
const pathApi = "/api/product";
const publicDirName = "public";
const templateNotFound = "/notFound.ejs";
const mainHtml = "public/spa.html";
const statusOk = 200;
const statusNotAuth = 401;
const statusForbidden = 403;
const statusNotFound = 404;
const statusError = 500;
const textNotFound = "Введенная вами страница на сайте не обнаружена";
const typeHtml = "text/html; charset=utf-8";
const typeJson = "application/json; charset=utf-8";
const userEmail = "user@mail.ru";
const SECRET = "secret_value";
const saltRounds = 10;
const payload = {
    email: userEmail
};
const token = jwt.sign(payload, SECRET, {
    expiresIn: "30m"
});

module.exports = {
    fs, ejs,
    express, DBService, bodyParser, cookieParser, jwt, bcrypt, jsonBodyParser, pathRoot, pathProduct, pathApi,
    publicDirName, templateNotFound, mainHtml, statusOk, statusNotAuth, statusForbidden, statusNotFound,
    statusError, textNotFound, typeHtml, typeJson, saltRounds, payload, token, SECRET
};
