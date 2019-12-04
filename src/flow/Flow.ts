import { Registrations } from "../support";
import { FlowRegistrationArgs } from "../types"

const flowArgsDefaults: FlowRegistrationArgs = { inputs: 0 } 

export function flow(pArgs?: Partial<FlowRegistrationArgs>, fn?: Function){

    const args = Object.assign({}, flowArgsDefaults, pArgs);

    const performRegistration = (flow: Function) => {
        Registrations.addFlow('default', {flow, args});
    }

    return fn ? performRegistration(fn) : performRegistration;
}