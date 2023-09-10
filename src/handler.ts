import * as Role from "creepMother"
import * as role from "roles"
import { maintainCreeps } from "mantainCreeps"

export default function handler() {
    for(const [name, creep] of Object.entries(Game.creeps)) {
        if(name.startsWith(Role.ROLE_HARVESTER)) {
            role.harvester.work(creep)
        }
        if(name.startsWith(Role.ROLE_UPGRADER)) {
            role.upgrader.work(creep)
        }
        if(name.startsWith(Role.ROLE_BUILDER)) {
            role.builder.work(creep)
        }
    }
    maintainCreeps.maintain('Spawn1')
}
