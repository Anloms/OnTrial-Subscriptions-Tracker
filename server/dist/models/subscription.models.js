"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_models_1 = __importDefault(require("./index.models"));
const subscriptionSchema = new index_models_1.default.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    billingDate: { type: Date, required: true },
    status: { type: Boolean, required: true }
});
const Subscription = index_models_1.default.model('subscription', subscriptionSchema);
exports.default = Subscription;
