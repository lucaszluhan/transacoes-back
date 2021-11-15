"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.User = exports.users = void 0;
const crypto_1 = require("crypto");
class Transaction {
    constructor(title, value, type) {
        this.title = title;
        this.value = value;
        this.type = type;
        this.title = title;
        this.value = value;
        this.type = type;
        this.id = (0, crypto_1.randomUUID)();
    }
}
exports.Transaction = Transaction;
class User {
    constructor(name, cpf, email, age) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.age = age;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.age = age;
        this.transactions = [];
        this.id = (0, crypto_1.randomUUID)();
    }
    getCPF() {
        return this.cpf;
    }
}
exports.User = User;
let users = [];
exports.users = users;
