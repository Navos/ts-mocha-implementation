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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const openapi_v3_1 = require("@loopback/openapi-v3");
const __1 = require("../..");
const testlab_1 = require("@loopback/testlab");
const context_1 = require("@loopback/context");
const chalk_1 = require("chalk");
const SequenceActions = rest_1.RestBindings.SequenceActions;
const log_spy_1 = require("../log-spy");
const in_memory_logger_1 = require("../in-memory-logger");
describe('log extension acceptance test', () => {
    let app;
    let spy;
    class LogApp extends __1.LogMixin(rest_1.RestApplication) {
    }
    const debugMatch = chalk_1.default.white('DEBUG: /debug :: MyController.debug() => debug called');
    const infoMatch = chalk_1.default.green('INFO: /info :: MyController.info() => info called');
    const warnMatch = chalk_1.default.yellow('WARN: /warn :: MyController.warn() => warn called');
    const errorMatch = chalk_1.default.red('ERROR: /error :: MyController.error() => error called');
    const nameMatch = chalk_1.default.yellow('WARN: /?name=test :: MyController.hello(test) => hello test');
    beforeEach(createApp);
    beforeEach(createController);
    beforeEach(createSequence);
    beforeEach(in_memory_logger_1.resetLogs);
    beforeEach(() => {
        spy = log_spy_1.createLogSpy();
    });
    afterEach(() => log_spy_1.restoreLogSpy(spy));
    it('logs information at DEBUG or higher', async () => {
        setAppLogToDebug();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.sinon.assert.calledWith(spy, debugMatch);
        await client.get('/info').expect(200, 'info called');
        testlab_1.sinon.assert.calledWith(spy, infoMatch);
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.sinon.assert.calledWith(spy, warnMatch);
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.sinon.assert.calledWith(spy, nameMatch);
    });
    it('logs information at INFO or higher', async () => {
        setAppLogToInfo();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.sinon.assert.calledWith(spy, infoMatch);
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.sinon.assert.calledWith(spy, warnMatch);
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.sinon.assert.calledWith(spy, nameMatch);
    });
    it('logs information at WARN or higher', async () => {
        setAppLogToWarn();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.sinon.assert.calledWith(spy, warnMatch);
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.sinon.assert.calledWith(spy, nameMatch);
    });
    it('logs information at ERROR', async () => {
        setAppLogToError();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
    });
    it('logs no information when logLevel is set to OFF', async () => {
        setAppLogToOff();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/error').expect(200, 'error called');
        testlab_1.expect(spy.called).to.be.False();
    });
    function createSequence() {
        let LogSequence = class LogSequence {
            constructor(findRoute, parseParams, invoke, send, reject, logger) {
                this.findRoute = findRoute;
                this.parseParams = parseParams;
                this.invoke = invoke;
                this.send = send;
                this.reject = reject;
                this.logger = logger;
            }
            async handle(context) {
                const { request, response } = context;
                // tslint:disable-next-line:no-any
                let args = [];
                // tslint:disable-next-line:no-any
                let result;
                try {
                    const route = this.findRoute(request);
                    args = await this.parseParams(request, route);
                    result = await this.invoke(route, args);
                    this.send(response, result);
                }
                catch (error) {
                    this.reject(context, error);
                    result = error;
                }
                await this.logger(request, args, result);
            }
        };
        LogSequence = __decorate([
            __param(0, context_1.inject(SequenceActions.FIND_ROUTE)),
            __param(1, context_1.inject(SequenceActions.PARSE_PARAMS)),
            __param(2, context_1.inject(SequenceActions.INVOKE_METHOD)),
            __param(3, context_1.inject(SequenceActions.SEND)),
            __param(4, context_1.inject(SequenceActions.REJECT)),
            __param(5, context_1.inject(__1.EXAMPLE_LOG_BINDINGS.LOG_ACTION)),
            __metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function])
        ], LogSequence);
        app.sequence(LogSequence);
    }
    async function createApp() {
        app = new LogApp();
        app.bind(__1.EXAMPLE_LOG_BINDINGS.TIMER).to(timer);
        app.bind(__1.EXAMPLE_LOG_BINDINGS.LOGGER).to(in_memory_logger_1.logToMemory);
    }
    function setAppLogToDebug() {
        app.logLevel(__1.LOG_LEVEL.DEBUG);
    }
    function setAppLogToWarn() {
        app.logLevel(__1.LOG_LEVEL.WARN);
    }
    function setAppLogToError() {
        app.logLevel(__1.LOG_LEVEL.ERROR);
    }
    function setAppLogToInfo() {
        app.logLevel(__1.LOG_LEVEL.INFO);
    }
    function setAppLogToOff() {
        app.logLevel(__1.LOG_LEVEL.OFF);
    }
    function createController() {
        class MyController {
            debug() {
                return 'debug called';
            }
            warn() {
                return 'warn called';
            }
            info() {
                return 'info called';
            }
            error() {
                return 'error called';
            }
            off() {
                return 'off called';
            }
            hello(name) {
                return `hello ${name}`;
            }
            nolog() {
                return 'nolog called';
            }
        }
        __decorate([
            openapi_v3_1.get('/debug'),
            __1.log(__1.LOG_LEVEL.DEBUG),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MyController.prototype, "debug", null);
        __decorate([
            openapi_v3_1.get('/warn'),
            __1.log(__1.LOG_LEVEL.WARN),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MyController.prototype, "warn", null);
        __decorate([
            openapi_v3_1.get('/info'),
            __1.log(__1.LOG_LEVEL.INFO),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MyController.prototype, "info", null);
        __decorate([
            openapi_v3_1.get('/error'),
            __1.log(__1.LOG_LEVEL.ERROR),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MyController.prototype, "error", null);
        __decorate([
            openapi_v3_1.get('/off'),
            __1.log(__1.LOG_LEVEL.OFF),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MyController.prototype, "off", null);
        __decorate([
            openapi_v3_1.get('/'),
            __1.log(),
            __param(0, openapi_v3_1.param.query.string('name')),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", void 0)
        ], MyController.prototype, "hello", null);
        __decorate([
            openapi_v3_1.get('/nolog'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MyController.prototype, "nolog", null);
        app.controller(MyController);
    }
    function timer(startTime) {
        if (!startTime)
            return [3, 3];
        return [2, 2];
    }
});
//# sourceMappingURL=log.extension.acceptance.js.map