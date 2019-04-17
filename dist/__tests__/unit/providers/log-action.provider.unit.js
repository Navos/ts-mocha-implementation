"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const __1 = require("../../..");
const chalk_1 = require("chalk");
const log_spy_1 = require("../../log-spy");
const in_memory_logger_1 = require("../../in-memory-logger");
describe('LogActionProvider with in-memory logger', () => {
    let spy;
    let logger;
    const req = { url: '/test' };
    beforeEach(() => {
        spy = log_spy_1.createLogSpy();
    });
    beforeEach(async () => (logger = await getLogger(in_memory_logger_1.logToMemory)));
    afterEach(() => log_spy_1.restoreLogSpy(spy));
    it('logs a value without a start time', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test() => test message');
        await logger(req, [], 'test message');
        testlab_1.sinon.assert.calledWith(spy, match);
    });
    it('logs a value with a start time', async () => {
        const match = chalk_1.default.red('ERROR: 100ms: /test :: TestClass.test() => test message');
        const startTime = logger.startTimer();
        await logger(req, [], 'test message', startTime);
        testlab_1.sinon.assert.calledWith(spy, match);
    });
    it('logs a value with args present', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test(test, message) => test message');
        await logger(req, ['test', 'message'], 'test message');
        testlab_1.sinon.assert.calledWith(spy, match);
    });
});
describe('LogActionProvider with default logger', () => {
    let stub;
    let logger;
    const req = { url: '/test' };
    beforeEach(() => {
        stub = log_spy_1.createConsoleStub();
    });
    beforeEach(async () => (logger = await getLogger()));
    afterEach(() => log_spy_1.restoreLogSpy(stub));
    it('logs a value without a start time', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test() => test message');
        await logger(req, [], 'test message');
        testlab_1.sinon.assert.calledWith(stub, match);
    });
    it('logs a value with a start time', async () => {
        const match = chalk_1.default.red('ERROR: 100ms: /test :: TestClass.test() => test message');
        const startTime = logger.startTimer();
        await logger(req, [], 'test message', startTime);
        testlab_1.sinon.assert.calledWith(stub, match);
    });
    it('logs a value with args present', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test(test, message) => test message');
        await logger(req, ['test', 'message'], 'test message');
        testlab_1.sinon.assert.calledWith(stub, match);
    });
});
async function getLogger(logWriter) {
    class TestClass {
        test() { }
    }
    __decorate([
        __1.log(__1.LOG_LEVEL.ERROR),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TestClass.prototype, "test", null);
    const provider = new __1.LogActionProvider(() => Promise.resolve(TestClass), () => Promise.resolve('test'), timer);
    if (logWriter)
        provider.writeLog = logWriter;
    return provider.value();
}
function timer(startTime) {
    if (!startTime)
        return [3, 3];
    else
        return [0, 100000002];
}
//# sourceMappingURL=log-action.provider.unit.js.map