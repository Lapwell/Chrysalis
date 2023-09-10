export const creepTransfer = function(creep:Creep, structure:Structure, resource:ResourceConstant) {
    const path = creep.room.findPath(creep.pos, structure.pos)
    if(creep.transfer(structure, resource) == ERR_NOT_IN_RANGE) {
        creep.move(path[0].direction)
    } else {
        creep.transfer(structure, resource)
    }
}
