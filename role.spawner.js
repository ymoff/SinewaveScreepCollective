var roleSpawner = {
    
    /** @param {Spawner} spawner **/
    run: function(spawner){
        
        var smallUtility = [WORK,WORK,CARRY,MOVE];
        var largeUtility = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];
        var mediumUtility = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]
        var mediumMeleeAttacker = [ATTACK,ATTACK,TOUGH,MOVE,MOVE]
        
        var minHarvester = 3;
        var minUpgrader = 1;
        var minBuilder = 2;
        var minJanitor = 1;
        var minMeleeAttack = 0;
    
        var roomCreeps = spawner.room.find(FIND_MY_CREEPS);
        
        var harvesters = _.filter(roomCreeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(roomCreeps, (creep) => creep.memory.role == 'upgrader');
        var janitors = _.filter(roomCreeps, (creep) => creep.memory.role == 'janitor');
        var meleeAttackers = _.filter(roomCreeps, (creep) => creep.memory.role == 'meleeattack');
        
        if(harvesters.length < minHarvester && spawner.canCreateCreep(largeUtility) == OK){
            var newName = spawner.createCreep(largeUtility, undefined, {role: 'harvester'});
            console.log('Spawning large harvester ' + newName);
        }
        else if(harvesters.length < minHarvester && spawner.canCreateCreep(smallUtility) == OK){
            var newName = spawner.createCreep(smallUtility, undefined, {role: 'harvester'});
            console.log('Spawning small harvester ' + newName);
        }
        else if(builders.length < minBuilder && spawner.canCreateCreep(largeUtility) == OK){
            var newName = spawner.createCreep(largeUtility, undefined, {role: 'builder'});
            console.log('Spawning large builder ' + newName);
        }
        else if(builders.length < minBuilder && spawner.canCreateCreep(smallUtility) == OK){
            var newName = spawner.createCreep(smallUtility, undefined, {role: 'builder'});
            console.log('Spawning small builder ' + newName);
        }
        else if(upgraders.length < minUpgrader && spawner.canCreateCreep(largeUtility) == OK){
            var newName = spawner.createCreep(largeUtility, undefined, {role: 'upgrader'});
            console.log('Spawning large upgrader ' + newName);
        }
        else if(upgraders.length < minUpgrader && spawner.canCreateCreep(smallUtility) == OK){
            var newName = spawner.createCreep(smallUtility, undefined, {role: 'upgrader'});
            console.log('Spawning small upgrader ' + newName);
        }
        else if(janitors.length < minJanitor && spawner.canCreateCreep(mediumUtility) == OK){
            var newName = spawner.createCreep(mediumUtility, undefined, {role:'janitor', isRepairing: false});
            console.log('Spawning medium janitor ' + newName);
        }
        else if(meleeAttackers.length < minMeleeAttack && spawner.canCreateCreep(mediumMeleeAttacker) == OK){
            var newName = spawner.createCreep(mediumMeleeAttacker, undefined, {role:'meleeattack'});
            console.log('Spawning melee attacker ' + newName);
        }
        
        if(spawner.spawning){
            var spawningCreep = Game.creeps[spawner.spawning.name];
            spawner.room.visual.text(
                '🔨' + spawningCreep.memory.role,
                spawner.pos.x + 1,
                spawner.pos.y,
                {align:'left', opacity: 0.8});
                
        }
        else
        {
            var aboutToDie = _.filter(roomCreeps,(creep) => creep.ticksToLive < 5);
            for(i = 0; i < aboutToDie.length; i++){
                console.log('recycling creep ' + aboutToDie[i].name + ' ' + aboutToDie[i].memory.role);
                spawner.recycleCreep(aboutToDie[i]);
            }
        }
    }
}

module.exports = roleSpawner;