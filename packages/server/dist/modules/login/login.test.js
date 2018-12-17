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
const TestClient_1 = require("./../../utils/TestClient");
const errorMessages_1 = require("./errorMessages");
const User_1 = require("../../entity/User");
const createTypeormConnection_1 = require("../../utils/createTypeormConnection");
const email = "bsob@bob.com";
const password = "12asd";
const LoginExpectError = (client, e, p, errMessage) => __awaiter(this, void 0, void 0, function* () {
    const response = yield client.login(e, p);
    expect(response.data).toEqual({
        login: [
            {
                path: "email",
                message: errMessage
            }
        ]
    });
});
let conn;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield createTypeormConnection_1.createTypeormConnection();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield conn.close();
}));
describe("login", () => {
    test("email not found send back error", () => __awaiter(this, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield LoginExpectError(client, "andrei@mail.com", "whatever", errorMessages_1.invalidLogin);
    }));
    test("email not confirmed", () => __awaiter(this, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield client.register(email, password);
        yield LoginExpectError(client, email, password, errorMessages_1.confirmEmailError);
        yield User_1.User.update({ email }, { confirmed: true });
        yield LoginExpectError(client, email, "asdlkfhaskd", errorMessages_1.invalidLogin);
        const response = yield client.login(email, password);
        expect(response.data).toEqual({ login: null });
    }));
});
//# sourceMappingURL=login.test.js.map