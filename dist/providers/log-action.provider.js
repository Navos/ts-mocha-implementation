"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
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
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const decorators_1 = require("../decorators");
const keys_1 = require("../keys");
const chalk_1 = require("chalk");
let LogActionProvider = class LogActionProvider {
    constructor(getController, getMethod, timer) {
        this.getController = getController;
        this.getMethod = getMethod;
        this.timer = timer;
        // LogWriteFn is an optional dependency and it falls back to `logToConsole`
        this.writeLog = logToConsole;
        this.logLevel = keys_1.LOG_LEVEL.WARN;
    }
    value() {
        const fn = ((req, args, 
        // tslint:disable-next-line:no-any
        result, start) => {
            return this.action(req, args, result, start);
        });
        fn.startTimer = () => {
            return this.timer();
        };
        return fn;
    }
    async action(req, args, 
    // tslint:disable-next-line:no-any
    result, start) {
        const controllerClass = await this.getController();
        const methodName = await this.getMethod();
        const metadata = decorators_1.getLogMetadata(controllerClass, methodName);
        const level = metadata ? metadata.level : undefined;
        if (level !== undefined &&
            this.logLevel !== keys_1.LOG_LEVEL.OFF &&
            level >= this.logLevel &&
            level !== keys_1.LOG_LEVEL.OFF) {
            if (!args)
                args = [];
            let msg = `${req.url} :: ${controllerClass.name}.`;
            msg += `${methodName}(${args.join(', ')}) => `;
            if (typeof result === 'object')
                msg += JSON.stringify(result);
            else
                msg += result;
            if (start) {
                const timeDiff = this.timer(start);
                const time = timeDiff[0] * 1000 + Math.round(timeDiff[1] * 1e-4) / 100;
                msg = `${time}ms: ${msg}`;
            }
            this.writeLog(msg, level);
        }
    }
};
__decorate([
    context_1.inject(keys_1.EXAMPLE_LOG_BINDINGS.LOGGER, { optional: true }),
    __metadata("design:type", Function)
], LogActionProvider.prototype, "writeLog", void 0);
__decorate([
    context_1.inject(keys_1.EXAMPLE_LOG_BINDINGS.APP_LOG_LEVEL, { optional: true }),
    __metadata("design:type", Number)
], LogActionProvider.prototype, "logLevel", void 0);
LogActionProvider = __decorate([
    __param(0, context_1.inject.getter(core_1.CoreBindings.CONTROLLER_CLASS)),
    __param(1, context_1.inject.getter(core_1.CoreBindings.CONTROLLER_METHOD_NAME)),
    __param(2, context_1.inject(keys_1.EXAMPLE_LOG_BINDINGS.TIMER)),
    __metadata("design:paramtypes", [Function, Function, Function])
], LogActionProvider);
exports.LogActionProvider = LogActionProvider;
function logToConsole(msg, level) {
    let output;
    switch (level) {
        case keys_1.LOG_LEVEL.DEBUG:
            output = chalk_1.default.white(`DEBUG: ${msg}`);
            break;
        case keys_1.LOG_LEVEL.INFO:
            output = chalk_1.default.green(`INFO: ${msg}`);
            break;
        case keys_1.LOG_LEVEL.WARN:
            output = chalk_1.default.yellow(`WARN: ${msg}`);
            break;
        case keys_1.LOG_LEVEL.ERROR:
            output = chalk_1.default.red(`ERROR: ${msg}`);
            break;
    }
    if (output)
        console.log(output);
}
//# sourceMappingURL=log-action.provider.js.map