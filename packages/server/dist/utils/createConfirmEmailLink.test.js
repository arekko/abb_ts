"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./../entity/User");
const node_fetch_1 = require("node-fetch");
const Redis = require("ioredis");
const createTypeormConnection_1 = require("./createTypeormConnection");
const createConfirmEmailLink_1 = require("./createConfirmEmailLink");
let userId = "";
const redis = new Redis();
let conn;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield createTypeormConnection_1.createTypeormConnection();
    const user = yield User_1.User.create({
        email: "arekko@mail.com",
        password: "alskdasdfif"
    }).save();
    userId = user.id;
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield conn.close();
}));
test("Make sure it confirms user and clears key in redis", () => __awaiter(this, void 0, void 0, function* () {
    const url = yield createConfirmEmailLink_1.createConfirmEmailLink(process.env.TEST_HOST, userId, redis);
    const respose = yield node_fetch_1.default(url);
    const text = yield respose.text();
    expect(text).toEqual("ok");
    const user = yield User_1.User.findOne({ where: { id: userId } });
    expect(user.confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = yield redis.get(key);
    expect(value).toBeNull();
}));
//# sourceMappingURL=createConfirmEmailLink.test.js.map