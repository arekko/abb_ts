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
const errorMessages_1 = require("./../register/errorMessages");
const errorMessages_2 = require("./../login/errorMessages");
const forgotPasswordLockAccount_1 = require("./../../utils/forgotPasswordLockAccount");
const TestClient_1 = require("./../../utils/TestClient");
const User_1 = require("./../../entity/User");
const createTypeormConnection_1 = require("./../../utils/createTypeormConnection");
const createForgotPasswordLink_1 = require("../../utils/createForgotPasswordLink");
const Redis = require("ioredis");
const errorMessages_3 = require("./errorMessages");
exports.redis = new Redis();
let conn;
let userId;
const email = "arekko@mail.com";
const password = "fasdfkasdfjh";
const newPassword = "asdfkjasdhf";
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield createTypeormConnection_1.createTypeormConnection();
    const user = yield User_1.User.create({
        email,
        password,
        confirmed: true
    }).save();
    userId = user.id;
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield conn.close();
}));
describe("forgot password", () => {
    test("forgot password test", () => __awaiter(this, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(userId, exports.redis);
        const url = yield createForgotPasswordLink_1.createForgotPasswordLink("", userId, exports.redis);
        const parts = url.split('/');
        const key = parts[parts.length - 1];
        expect(yield client.login(email, password)).toEqual({
            data: {
                login: [{
                        path: 'email',
                        message: errorMessages_2.forgotPosswordLockedError
                    }]
            }
        });
        expect(yield client.forgotPasswordChange('s', key)).toEqual({
            data: {
                forgotPasswordChange: [{
                        path: 'newPassword',
                        message: errorMessages_1.passwordNotLongEnough
                    }]
            }
        });
        const response = yield client.forgotPasswordChange(newPassword, key);
        expect(response.data).toEqual({
            forgotPasswordChange: null
        });
        expect(yield client.forgotPasswordChange('asdfasdfasd', key)).toEqual({
            data: {
                forgotPasswordChange: [{
                        path: 'key',
                        message: errorMessages_3.expiredKeyError
                    }]
            }
        });
        expect(yield client.login(email, newPassword)).toEqual({
            data: {
                login: null
            }
        });
    }));
});
//# sourceMappingURL=forgotPassword.test.js.map