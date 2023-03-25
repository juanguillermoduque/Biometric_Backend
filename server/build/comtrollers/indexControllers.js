"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
class indexController {
    index(req, res) {
        res.send("hello");
    }
}
exports.IndexController = new indexController();
