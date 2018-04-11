/// <reference types="node" />
import { Writable, WritableOptions } from "stream";
export declare class NullStream extends Writable {
    constructor(opts?: WritableOptions);
    _write(chunk: string | Buffer, encoding: string, callback: () => any): void;
}
