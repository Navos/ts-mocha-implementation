/// <reference types="sinon" />
import { sinon } from '@loopback/testlab';
export declare function createLogSpy(): sinon.SinonSpy<[(string | undefined)?], void>;
export declare function restoreLogSpy(spy: sinon.SinonSpy): void;
export declare function createConsoleStub(): sinon.SinonStub<[any?, ...any[]], void>;
