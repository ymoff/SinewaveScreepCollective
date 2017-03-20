var roleMeleeAttack = {
    run: function(creep){
        var hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(hostileCreep)
        {
            creep.say('⚔ attack')
            if(creep.attack(hostileCreep) == ERR_NOT_IN_RANGE){
                creep.moveTo(hostileCreep, {visualizePathStyle: {stroke: '#ff0000'}})
            }
        }
        else{
            
        var rallyPoint = creep.pos.findClosestByRange(FIND_FLAGS,{filter: function(flag){
            return flag.color == COLOR_WHITE && flag.secondaryColor == COLOR_RED;}});
            
            if(!creep.pos.isNearTo(rallyPoint)){
            creep.moveTo(rallyPoint, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}

module.exports = roleMeleeAttack;