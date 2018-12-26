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
const redis_1 = require("./../redis");
const User_1 = require("./../entity/User");
exports.confirmEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`req params: ${id}`);
    const userId = yield redis_1.redis.get(id);
    console.log(userId);
    if (userId) {
        yield User_1.User.update({ id: userId }, { confirmed: true });
        yield redis_1.redis.del(id);
        res.send("ok");
    }
    else {
        res.send("invalid");
    }
});
//# sourceMappingURL=confirmEmail.js.map