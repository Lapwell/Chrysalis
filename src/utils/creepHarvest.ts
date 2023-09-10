export const creepHarvest = function(creep:Creep) {
    const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
    if(!source) {
        creep.say('No Sources')
        return
    }
    const path = creep.room.findPath(creep.pos, source.pos)
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.move(path[0].direction)
    } else {
        creep.harvest(source)
    }
}
