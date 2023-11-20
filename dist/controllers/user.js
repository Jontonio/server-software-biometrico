"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.registerUser = exports.updateUser = exports.getOneUser = exports.getUsers = void 0;
const models_1 = require("../models");
const Response_1 = require("../class/Response");
const helpers_1 = require("../helpers");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get all users 
        const users = yield models_1.User.findAll({
            where: { status: true },
            attributes: {
                exclude: ['password']
            },
            include: models_1.Role
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Lista de usuarios', true, users, users.length));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener los usuarios', false, null));
    }
});
exports.getUsers = getUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id user from params
        const { id_user } = req.params;
        // find one user 
        const user = yield models_1.User.findByPk(id_user, {
            attributes: {
                exclude: ['password']
            }
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Usuario con id ${id_user}`, true, user));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error el usuario', false, null));
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id user from params
        const { id_user } = req.params;
        const { body } = req;
        // get one user by primary key
        const user = yield models_1.User.findByPk(id_user);
        // update user
        const resUpdateUser = yield user.set(body).save();
        // delete password
        const userWithoutPassword = Object.assign({}, resUpdateUser.toJSON());
        delete userWithoutPassword.password;
        // return reponse message 
        return res.status(200).json(new Response_1.ResponseServer('Usuario actualizado correctamente', true, userWithoutPassword));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer(`Ocurrio un error al actualizar usuario`, false, null));
    }
});
exports.updateUser = updateUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data from body
        const { body } = req;
        const { id_card } = body;
        // encrypt password
        body.password = (0, helpers_1.hasPassword)(id_card);
        // register user      
        const createdUser = yield models_1.User.create(body);
        // delete password 
        const userWithoutPassword = Object.assign({}, createdUser.toJSON());
        delete userWithoutPassword.password;
        //return response message
        return res.status(201).json(new Response_1.ResponseServer('Usuario registrado correctamente', true, userWithoutPassword));
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(new Response_1.ResponseServer(`Ocurrio un error al registrar nuevo usuario`, false, null));
    }
});
exports.registerUser = registerUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id card from params
        const { id_user } = req.params;
        // find one user
        const user = yield models_1.User.findByPk(id_user);
        // delete the same user
        const resUser = yield (user === null || user === void 0 ? void 0 : user.set({ satatus: false }).save());
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Usuario eliminado correctamente', true, resUser));
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(new Response_1.ResponseServer(`Ocurrio un error al eliminar el usuario`, false, null));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map