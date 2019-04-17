"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
/**
 * Binding keys used by this component.
 */
var EXAMPLE_LOG_BINDINGS;
(function (EXAMPLE_LOG_BINDINGS) {
    EXAMPLE_LOG_BINDINGS.APP_LOG_LEVEL = context_1.BindingKey.create('example.log.level');
    EXAMPLE_LOG_BINDINGS.TIMER = context_1.BindingKey.create('example.log.timer');
    EXAMPLE_LOG_BINDINGS.LOGGER = context_1.BindingKey.create('example.log.logger');
    EXAMPLE_LOG_BINDINGS.LOG_ACTION = context_1.BindingKey.create('example.log.action');
})(EXAMPLE_LOG_BINDINGS = exports.EXAMPLE_LOG_BINDINGS || (exports.EXAMPLE_LOG_BINDINGS = {}));
/**
 * The key used to store log-related via @loopback/metadata and reflection.
 */
exports.EXAMPLE_LOG_METADATA_KEY = 'example.log.metadata';
/**
 * Enum to define the supported log levels
 */
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 0] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["INFO"] = 1] = "INFO";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 2] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["OFF"] = 4] = "OFF";
})(LOG_LEVEL = exports.LOG_LEVEL || (exports.LOG_LEVEL = {}));
//# sourceMappingURL=keys.js.map