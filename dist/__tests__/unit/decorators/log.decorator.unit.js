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
describe('@log() decorator (unit)', () => {
    it('sets log level for method to given value', () => {
        class TestClass {
            test() { }
        }
        __decorate([
            __1.log(__1.LOG_LEVEL.ERROR),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestClass.prototype, "test", null);
        const level = __1.getLogMetadata(TestClass, 'test');
        testlab_1.expect(level.level).to.be.eql(__1.LOG_LEVEL.ERROR);
    });
    it('sets log level for method to default', () => {
        class TestClass {
            test() { }
        }
        __decorate([
            __1.log(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestClass.prototype, "test", null);
        const level = __1.getLogMetadata(TestClass, 'test');
        testlab_1.expect(level.level).to.be.eql(__1.LOG_LEVEL.WARN);
    });
});
//# sourceMappingURL=log.decorator.unit.js.map