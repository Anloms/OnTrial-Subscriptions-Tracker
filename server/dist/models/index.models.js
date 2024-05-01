"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/Subscriptions';
// MongoDB connection
if (process.env.NODE_ENV === 'production') {
    mongoose_1.default
        .connect(dbConnection, {
        dbName: 'onTrial',
        writeConcern: { w: 'majority' }
    })
        .then(() => { console.log('MongoDB connected'); })
        .catch((err) => { console.error('Could not connect to MongoDB...', err); });
}
exports.default = mongoose_1.default;
