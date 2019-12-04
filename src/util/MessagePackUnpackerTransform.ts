import * as MsgPack from "msgpack"
import { Transform, TransformCallback } from "stream";

/**
 * Simple transform that reads a stream of MsgPack
 * encoded objects (prefixed by their size) and decodes
 * them into a stream of objects.
 */
export class MessagePackUnpackerTransform extends Transform{

    private readonly buffer: Buffer;
    private offset = 0;

    constructor(opts?: any){
        super({...opts, readableObjectMode: true});

        this.buffer = Buffer.alloc(4*1024*1024);
    }

    private tryReadObject(){
        const size = this.buffer.slice(0, 4).readInt32LE(0);
        const objEnd = size + 4;

        // Means that there are at least size bytes,
        // enough to read the next message
        if(this.offset >= objEnd){
            const obj = MsgPack.unpack(this.buffer.slice(4, objEnd));
            const rest = this.buffer.slice(objEnd, this.offset);
            rest.copy(this.buffer, 0);
            this.offset = 0;
            this.push(obj);
        }
    }

    _transform(chunk: any, encoding: string, callback: TransformCallback) {

        this.offset += chunk.copy(this.buffer, this.offset);

        if(this.offset >= 4){
            this.tryReadObject();
        }

        callback();
    }
}