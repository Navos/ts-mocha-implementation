"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../keys");
const component_1 = require("../component");
/**
 * A mixin class for Application that can bind logLevel from `options`.
 * Also provides .logLevel() to bind application wide logLevel.
 * Functions with a log level set to logLevel or higher sill log data
 *
 * ```ts
 * class MyApplication extends LogMixin(Application) {}
 * ```
 */
// tslint:disable-next-line:no-any
function LogMixin(superClass) {
    return class extends superClass {
        // A mixin class has to take in a type any[] argument!
        // tslint:disable-next-line:no-any
        constructor(...args) {
            super(...args);
            if (this.options && this.options.logLevel) {
                this.logLevel(this.options.logLevel);
            }
            this.component(component_1.LogComponent);
        }
        /**
         * Set minimum logLevel to be displayed.
         *
         * @param level The log level to set for @log decorator
         *
         * ```ts
         * app.logLevel(LOG_LEVEL.INFO);
         * ```
         */
        logLevel(level) {
            this.bind(keys_1.EXAMPLE_LOG_BINDINGS.APP_LOG_LEVEL).to(level);
        }
    };
}
exports.LogMixin = LogMixin;
//# sourceMappingURL=log.mixin.js.map