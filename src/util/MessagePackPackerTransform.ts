import * as MsgPack from "msgpack"
import { Transform, TransformCallback } from "stream";

/**
 * Simple transform that reads a stream of MsgPack
 * encoded objects (prefixed by their size) and decodes
 * them into a stream of objects.
 */
export class MessagePackPackerTransform extends Transform{

    constructor(opts?: any){
        super({...opts, writableObjectMode: true});
    }

    _transform(chunk: any, encoding: string, callback: TransformCallback) {

        const bytes = MsgPack.pack(chunk);
        const size = Buffer.alloc(4);
        size.writeInt32LE(bytes.length, 0);
        this.push(size);
        this.push(bytes);

        callback();
    }
}