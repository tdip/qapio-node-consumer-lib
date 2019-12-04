import { Registrations } from "../support"

import { RuntimeContext } from "./RuntimeContext"
import { RuntimeManager } from "./RuntimeManager"

export function start(){
    const runtimeContext : RuntimeContext = { 
        getFlow: Registrations.getFlow
    }
    
    const manager = new RuntimeManager(runtimeContext);
    manager.init();
}