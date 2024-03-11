"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var web3_1 = __importDefault(require("web3"));
var Web3Connection = /** @class */ (function () {
    function Web3Connection(rpc) {
        this.wsOptions = {
            timeout: 10000,
            clientConfig: {
                keepalive: true,
                keepaliveInterval: 3000
            },
            reconnect: {
                auto: true,
                delay: 2000,
                maxAttempts: 5,
                onTimeout: true
            },
            reconnectDelay: 1
        };
        this.rpc = rpc;
    }
    Web3Connection.prototype.getProvider = function () {
        var prov = this.rpc;
        if (this.rpc.startsWith('http')) {
            prov = new web3_1["default"].providers.HttpProvider(this.rpc);
        }
        if (this.rpc.startsWith('ws')) {
            prov = new web3_1["default"].providers.WebsocketProvider(this.rpc, this.wsOptions);
        }
        return prov;
    };
    Web3Connection.prototype.createConnection = function () {
        return new web3_1["default"](this.getProvider());
    };
    return Web3Connection;
}());
exports["default"] = Web3Connection;
