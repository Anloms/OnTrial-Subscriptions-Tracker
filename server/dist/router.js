"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require('express');
const controllers_1 = require("./controllers/controllers");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).send('Welcome to the OnTrial Subscription Tracker!');
});
router.get('/subscriptions', controllers_1.getSubs);
router.post('/subscriptions', controllers_1.addSub);
router.put('/subscriptions/:id', controllers_1.editSub);
router.delete('/subscriptions/:id', controllers_1.deleteSub);
router.delete('/notifications/:id', controllers_1.deleteNotif);
router.get('/notifications', controllers_1.getNotification);
exports.default = router;
