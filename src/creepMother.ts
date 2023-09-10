export const ROLE_HARVESTER = 'harvester'
export const ROLE_UPGRADER = 'upgrader'
export const ROLE_BUILDER = 'builder'
export const ROLE_MELEE_DEFENDER = 'meleeDefender'

// TOUGH = 10
// MOVE = 50
// CARRY = 50
// WORK = 100
// ATTACK = 80
// RANGED_ATTACK = 150
// HEAL = 250
// CLAIM  = 600

export const creepMother = {
    birth: function(spawn:StructureSpawn, role:string) {
        var name = role + Game.time;
        switch(role) {
            case (ROLE_HARVESTER):
                //Cost: 300
                spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], name, {
                    memory: {
                        role: ROLE_HARVESTER,
                        room: spawn.room.name, working:false, upgrading:false
                    }
                });
                break;
            case (ROLE_UPGRADER):
                //Cost: 300
                spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], name, {
                    memory: {
                        role: ROLE_UPGRADER,
                        room: spawn.room.name, working:false, upgrading:false
                    }
                });
                break;
            case (ROLE_BUILDER):
                //Cost: 300
                spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], name, {
                    memory: {
                        role: ROLE_BUILDER,
                        room: spawn.room.name, working:false, upgrading:false
                    }
                });
                break;
            case (ROLE_MELEE_DEFENDER):
                //Cost: 300
                spawn.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], name, {
                    memory: {
                        role: ROLE_MELEE_DEFENDER,
                        room: spawn.room.name, working:false, upgrading:false
                    }
                });
                break;
            }
    }
}
