
const express = require('express')

const app = (function () {
    var instance;

    function createInstance() {
        var object = express();
        return object;
    }

    return instance ? instance : createInstance();
})();
exports.app = app;