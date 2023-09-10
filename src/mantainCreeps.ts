import * as Role from 'creepMother'
import { creepMother } from 'creepMother'

export const maintainCreeps = {
    maintain: function(spawnName:string) {
        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Role.ROLE_HARVESTER)
        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Role.ROLE_UPGRADER)
        const builders = _.filter(Game.creeps, (creep) => creep.memory.role == Role.ROLE_BUILDER)
        const meleeDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == Role.ROLE_MELEE_DEFENDER)
        const spawner = Game.spawns[spawnName]

        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        if(!spawner.spawning) {
            if(harvesters.length < 2) {
                console.log('Spawning new harvester')
                creepMother.birth(spawner, Role.ROLE_HARVESTER)
                return
            }
            if(upgraders.length < 1) {
                console.log('Spawning new upgrader')
                creepMother.birth(spawner, Role.ROLE_UPGRADER)
                return
            }
            if(builders.length < 1) {
                console.log('Spawning new Builder')
                creepMother.birth(spawner, Role.ROLE_BUILDER)
            }
        }
    }
}
