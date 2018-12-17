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
const User_1 = require("./../../entity/User");
const createTypeormConnection_1 = require("./../../utils/createTypeormConnection");
const TestClient_1 = require("../../utils/TestClient");
let conn;
let userId;
const email = "arekko@mail.com";
const password = "fasdfkasdfjh";
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
describe("me", () => {
    const client = new TestClient_1.TestClient(process.env.TEST_HOST);
    test("return null if no cookie", () => __awaiter(this, void 0, void 0, function* () {
        const response2 = yield client.me();
        expect(response2.data.me).toBeNull();
    }));
    test("get current user", () => __awaiter(this, void 0, void 0, function* () {
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data).toEqual({
            me: {
                id: userId.toString(),
                email
            }
        });
    }));
});
//# sourceMappingURL=me.test.js.map