import { FlowRegistrationArgs } from "../types/FlowRegistrationArgs"

export type FlowRegistration = {
    flow: Function,
    args: FlowRegistrationArgs
}