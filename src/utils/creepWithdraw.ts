export const creepWithdraw = function(creep:Creep, structure:Structure|any, resource:ResourceConstant) {
    const path = creep.room.findPath(creep.pos, structure.pos)
    if(creep.withdraw(structure, resource) == ERR_NOT_IN_RANGE) {
        creep.move(path[0].direction)
    } else {
        creep.withdraw(structure, resource)
    }
}
