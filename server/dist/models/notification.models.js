"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_models_1 = __importDefault(require("./index.models"));
const notificationSchema = new index_models_1.default.Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});
const Notification = index_models_1.default.model('Notification', notificationSchema);
exports.default = Notification;
