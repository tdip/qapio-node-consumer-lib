import { FlowRegistration } from "./FlowRegistration"

export namespace Registrations {
    const availableFlows : { [key: string]: FlowRegistration } = {};

    export function addFlow(key: string, flow: FlowRegistration){
        availableFlows[key] = flow;
    }

    export function getFlow(key: string): FlowRegistration {
        return availableFlows[key];
    }
}