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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotification = exports.deleteNotif = exports.deleteSub = exports.editSub = exports.addSub = exports.getSubs = void 0;
const subscription_models_1 = __importDefault(require("../models/subscription.models"));
const notification_models_1 = __importDefault(require("../models/notification.models"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
function errorRes(message) {
    return { errors: { message } };
}
function dataResponse(data) {
    return { data };
}
const getSubs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield subscription_models_1.default.find();
        res.send(dataResponse(subscriptions));
    }
    catch (error) {
        res.status(500).send({
            errors: { message: 'There was an error fetching the subscriptions' }
        });
        console.error('Error fetching subscriptions:', error);
    }
});
exports.getSubs = getSubs;
const addSub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sub = {
            cost: req.body.cost,
            billingDate: req.body.billingDate,
            name: req.body.name,
            status: req.body.status
        };
        if (sub.cost === undefined || sub.billingDate === undefined || sub.name === '' || sub.name === undefined || sub.status === undefined) {
            console.log('update failed due to missing values');
            res.status(400).json({ errors: { message: 'missing values' } });
        }
        else {
            const subscription = new subscription_models_1.default(sub);
            yield subscription.save();
            res.send(dataResponse(subscription));
        }
    }
    catch (error) {
        res.status(500).send({
            errors: { message: 'An error occurred while adding the subscription.' }
        });
        console.error('Error adding subscription:', error);
    }
});
exports.addSub = addSub;
exports.editSub = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Updating subscription with ID: ${id}`); // Debugging log
    try {
        const sub = {
            cost: req.body.cost,
            billingDate: req.body.billingDate,
            name: req.body.name,
            status: req.body.status
        };
        if (sub.cost === undefined ||
            sub.billingDate === undefined ||
            sub.name === '' ||
            sub.name === undefined ||
            sub.status === undefined) {
            console.log('update failed due to missing values');
            res.status(400).json(errorRes('missing values'));
        }
        const subscription = yield subscription_models_1.default.findByIdAndUpdate(id, sub, {
            new: true
        });
        if (subscription === null) {
            console.log('no sub found');
            res.status(404).send(errorRes('Subscription not found'));
        }
        else {
            res.send(dataResponse(subscription));
        }
    }
    catch (error) {
        res.status(500).send(errorRes('Unable to update.'));
        console.error('Error updating subscription:', error);
    }
}));
exports.deleteSub = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id === undefined)
            res.status(400).json(errorRes('No id'));
        const deletedSubscription = yield subscription_models_1.default.findByIdAndDelete(req.params.id);
        if (deletedSubscription === undefined || deletedSubscription === null) {
            res.status(404).send('Subscription not found');
        }
        else {
            res.send(dataResponse(deletedSubscription));
        }
    }
    catch (error) {
        res.status(500).send(errorRes('Deletion unsuccessful'));
        console.error('deletion error', error);
    }
}));
exports.deleteNotif = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id === undefined)
            res.status(400).json(errorRes('No id'));
        const deletedNotification = yield notification_models_1.default.findByIdAndDelete(req.params.id);
        if (deletedNotification === undefined || deletedNotification === null) {
            res.status(404).send('Subscription not found');
        }
        else {
            res.send(dataResponse(deletedNotification));
        }
    }
    catch (error) {
        res.status(500).send(errorRes('Deletion unsuccessful'));
        console.error('deletion error', error);
    }
}));
exports.getNotification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notification_models_1.default.find({ read: false }).sort({
            date: -1
        });
        res.json(dataResponse(notifications));
    }
    catch (error) {
        res.status(500).send(errorRes('Error fetching notifications.'));
    }
}));
