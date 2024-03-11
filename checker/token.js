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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.TokenChecker = void 0;
var erc20_json_1 = __importDefault(require("../abis/erc20.json"));
var units_1 = require("@ethersproject/units");
var bignumber_1 = require("@ethersproject/bignumber");
var TokenChecker = /** @class */ (function () {
    function TokenChecker(web3, tokenContractAddress, extraOptions) {
        this.abi = erc20_json_1["default"];
        this.web3 = web3;
        this.tokenContractAddress = tokenContractAddress;
        if (extraOptions && extraOptions.abi) {
            this.abi = extraOptions.abi;
        }
        this.tokenContract = new this.web3.eth.Contract(this.abi, tokenContractAddress);
    }
    TokenChecker.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tokenContract.methods.balanceOf(address).call()];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, Promise.resolve(balance)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TokenChecker.prototype.decimal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var decimal, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tokenContract.methods.decimal().call()];
                    case 1:
                        decimal = _a.sent();
                        return [2 /*return*/, Promise.resolve(decimal)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TokenChecker.prototype.methodCaller = function (methodName, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (_a = this.tokenContract.methods)[methodName].apply(_a, args).call()];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                    case 2:
                        error_3 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TokenChecker.prototype.formatUnits = function (balance, decimal) {
        return __awaiter(this, void 0, void 0, function () {
            var decimalToken, format, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!!decimal) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.decimal()];
                    case 1:
                        decimal = _a.sent();
                        _a.label = 2;
                    case 2:
                        decimalToken = bignumber_1.BigNumber.from(decimal ? decimal : 18);
                        format = (0, units_1.formatUnits)(bignumber_1.BigNumber.from(balance), decimalToken);
                        return [2 /*return*/, Promise.resolve(format)];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TokenChecker;
}());
exports.TokenChecker = TokenChecker;
