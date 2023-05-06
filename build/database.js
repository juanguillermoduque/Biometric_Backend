"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//se importan libreria mysql y variables de conexion
const mysql2_1 = __importDefault(require("mysql2"));
const keys_1 = __importDefault(require("./keys"));
//se crea el pool
const pool = mysql2_1.default.createPool(keys_1.default.database);
//se ejecuta la conexion 
pool.getConnection((err) => {
    if (err) {
        console.log("error de conexion");
    }
    else {
        console.log("conexion exitosa");
    }
});
//se exporta el pool 
exports.default = pool;
