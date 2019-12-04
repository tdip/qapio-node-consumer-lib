import { Readable, Writable } from "stream";

import { MessagePackPackerTransform } from "./MessagePackPackerTransform"
import { MessagePackUnpackerTransform } from "./MessagePackUnpackerTransform";

export function createMessagePacker(ws: Writable){
    const inputStream = new Readable({objectMode: true});
    inputStream._read = () => {};
    inputStream.pipe(new MessagePackPackerTransform()).pipe(ws);
    return inputStream;
}

export function createMessageUnPacker(rs: Readable){
    return rs.pipe(new MessagePackUnpackerTransform());
}