import { createReadStream, createWriteStream } from "fs"
import { Readable, Writable } from "stream";

import { IFlowContext } from "../types"

export class FlowContext implements IFlowContext {

    private constructor(
        public readonly inputStreams: Readable[],
        public readonly outputStream: Writable){
    }

    private close(){}

    static async useFlowContext(message: any, handler: (ctx: IFlowContext) => Promise<void>): Promise<void>{

        const context = new FlowContext(
            message.inputStreams.map(createReadStream),
            createWriteStream(message.outputStream));

        try{
            await handler(context);
        }finally{
            context.close();
        }
    }
}