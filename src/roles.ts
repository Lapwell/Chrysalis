import { creepHarvest } from "utils/creepHarvest"
import { creepTransfer } from "utils/creepTransfer"
import { creepWithdraw } from "utils/creepWithdraw"

// if(spawn && spawnFreeCapacity && creep.transfer(spawn, RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE) {
//     creep.moveTo(Game.spawns['Spawn1'])
// } else if(spawn && spawnFreeCapacity){
//     creep.transfer(spawn, RESOURCE_ENERGY)
// } else {
//     let struct = null
//     for(let i = 0; struct = extensions[i]; i++) {
//         if(struct.energy() < struct.energyCapacity() && creep.transfer(struct, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//             creep.moveTo(struct)
//         } else {
//             creep.transfer(struct, RESOURCE_ENERGY)
//             return
//         }
//     }
// }

export const harvester = {
    work: function(creep:Creep) {
        const nearestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
        const freeCapacity = creep.store.getFreeCapacity()
        const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
        const spawnFreeCapacity = spawn?.store.getFreeCapacity(RESOURCE_ENERGY)
        const extensions:any = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})

        if(freeCapacity > 0) {
            creepHarvest(creep)
        } else if(spawn && spawnFreeCapacity && spawnFreeCapacity > 0) {
            creepTransfer(creep, spawn, RESOURCE_ENERGY)
        }
    }
}

// if(upgrading && creep.store[RESOURCE_ENERGY] == 0) {
//     creep.memory.upgrading = false
// }
// if(!upgrading && freeCapacity == 0) {
//     creep.memory.upgrading = true
// }
// if(upgrading && roomController) {
//     if(creep.upgradeController(roomController) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(roomController, {visualizePathStyle: {stroke:"ffaa00"}})
//     } else {
//         creep.upgradeController(roomController)
//     }
// }
// }

export const upgrader = {
    work: function(creep:Creep) {
        const nearestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
        const freeCapacity = creep.store.getFreeCapacity()
        const upgrading = creep.memory.upgrading
        const roomController = creep.room.controller

        //If out of energy, go refill
        if(upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false
        }
        //If full of energy, go upgrade.
        if(!upgrading && freeCapacity == 0) {
            creep.memory.upgrading = true
        }
        //When out of energy, choose where to refill
        if(creep.memory.upgrading == false) {
            const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
            const spawnFreeCapacity = spawn?.store.getFreeCapacity(RESOURCE_ENERGY)
            const nearestExtension = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})
            //Try the nearest spawn first
            if(spawn && spawnFreeCapacity == 0) {
                creepWithdraw(creep, spawn, RESOURCE_ENERGY)
                // @ts-ignore
            } else if(nearestExtension && nearestExtension.store.getFreeCapacity() < nearestExtension.store.getCapacity()/2) {
                //Try an extension next
                creepWithdraw(creep, nearestExtension, RESOURCE_ENERGY)
            } else if(nearestSource) {
                //If all else fails, harvest sources
                creepHarvest(creep)
            }
        }
    }
}

export const builder = {
    work: function(creep:Creep) {
        const nearestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
        const freeCapacity = creep.store.getFreeCapacity()
        const buildSites = Game.constructionSites
        console.log('Build sites', buildSites[0])

        if(freeCapacity > 0 && nearestSource) {
            if(creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestSource)
            } else {
                creep.harvest(nearestSource)
            }
        } else if(creep.build(buildSites[0]) ==  ERR_NOT_IN_RANGE) {
            creep.moveTo(buildSites[0])
        } else {
            creep.build(buildSites[0])
        }
        if(buildSites[0] == undefined) {
            creep.moveTo(10, 29)
        }
    }
}

export const meleeDefender = {
    work: function(creep:Creep) {
    }
}
