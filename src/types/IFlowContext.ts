import { createReadStream, createWriteStream } from "fs"
import { Readable, Writable } from "stream";

/**
 * The most general purpose context given to a flow.
 * This context contains a sequence of input streams
 * that will be written to by Qapio and an output
 * stream where it can write values that will be
 * sent off to Qapio.
 */
export interface IFlowContext {
    readonly inputStreams: Readable[];
    readonly outputStream: Writable
}