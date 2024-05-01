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
const cron_1 = require("cron");
const date_fns_1 = require("date-fns");
const subscription_models_1 = __importDefault(require("../models/subscription.models"));
const notificationUtils_1 = __importDefault(require("../utils/notificationUtils"));
const checkSubscriptionsAndNotify = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptions = yield subscription_models_1.default.find();
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    yield Promise.all(subscriptions.map((subscription) => __awaiter(void 0, void 0, void 0, function* () {
        const billingDate = new Date(subscription.billingDate);
        if ((0, date_fns_1.differenceInCalendarDays)(billingDate, tomorrow) === 0) {
            yield (0, notificationUtils_1.default)(subscription.name);
        }
    })));
});
const hour = '09';
const minute = '49';
// run every day at 7 AM
const job = new cron_1.CronJob(`${minute} ${hour} * * *`, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Checking subscriptions and notifying...');
    yield checkSubscriptionsAndNotify();
}), null, true, 'Europe/London');
job.start();
console.log('Scheduled job started. It will check subscriptions daily at 7:55 PM LONDON time.');
exports.default = checkSubscriptionsAndNotify;
