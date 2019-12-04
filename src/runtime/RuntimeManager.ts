import { createReadStream, ReadStream } from "fs";

import { MessagePackUnpackerTransform } from "../util"

import { FlowContext } from "./FlowContext"
import { QapioMessageTypes } from "./messages"
import { RuntimeContext } from "./RuntimeContext"

const QAPIO_NAMED_PIPE_LOCATION = "QAPIO_NAMED_PIPE_LOCATION";
const QAPIO_INPUT_NAMED_PIPE_SUFIX = "_INPUT_PIPE";
const QAPIO_OUTPUT_NAMED_PIPE_SUFFIX = "_OUTPUT_PIPE";

export class RuntimeManager {

    private readonly inputEventStream: ReadStream;

    constructor(private readonly context: RuntimeContext){

        const io_pipe_base = process.env[QAPIO_NAMED_PIPE_LOCATION];
        const input_pipe_location = io_pipe_base + QAPIO_INPUT_NAMED_PIPE_SUFIX;

        this.inputEventStream = createReadStream(input_pipe_location);
        this.handleMessage = this.handleMessage.bind(this);
    }

    private async handleMessageUnsafe(request: any){

        if(request.type === QapioMessageTypes.NEW_FLOW_REQUEST){
            const flow = this.context.getFlow('default');
            await FlowContext.useFlowContext(
                request,
                ctx => flow.flow(ctx));
        }
    }

    private async handleMessage(request: any){
        try{
            await this.handleMessageUnsafe(request);
        }catch(e){
            // Todo: 
            console.error(e);
        }
    }

    public init(){
        this.inputEventStream.pipe(new MessagePackUnpackerTransform()).on('data', this.handleMessage);
    }
}