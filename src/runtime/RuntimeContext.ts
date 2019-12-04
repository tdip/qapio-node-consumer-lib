import { FlowRegistration } from "../support";

export type RuntimeContext = {
    getFlow(id: string): FlowRegistration
};

