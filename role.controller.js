/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.controller');
 * mod.thing == 'a thing'; // true
 */
 
 var roleController = {
     run:function(cTower){
         
        var deposits = cTower.room.find(FIND_SOURCES_ACTIVE);
        var spawn = cTower.room.find(FIND_MY_STRUCTURES, {filter: (structure) => {
            return structure.structureType == STRUCTURE_SPAWN;
            }})[0];
         
         if(!cTower.room.memory.initialSetupComplete){
             console.log('Performing initial room construction');
             //Spawn -> tower road
             var path = spawn.pos.findPathTo(cTower);
             console.log('Pathing to controller');
             for(var i = 0; i < path.length; i++){
                 cTower.room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
             }
             
             //Spawn -> deposits
             console.log('Pathing to sources');
             for(var i = 0; i < deposits.length; i++){
                 var path = spawn.pos.findPathTo(deposits[i]);
                 for(var j = 0; j < path.length; j++){
                    cTower.room.createConstructionSite(path[j].x, path[j].y, STRUCTURE_ROAD);
                 }
             }
             
            cTower.room.memory.initialSetupComplete = true;
         }
         
         if(cTower.level == 2
            && !cTower.room.memory.level2SetupComplete){
            
            var closestDeposit = spawn.pos.findClosestByRange(FIND_SOURCES);
            var path = spawn.pos.findPathTo(closestDeposit);
            var midPoint = path[Math.floor(path.length / 2)];
            var midPosition = new RoomPosition(midPoint.x, midPoint.y, spawn.pos.roomName);
            // Build Extensions
            var startPlace = getRandomFreePos(midPosition, 2);
            
            
            for(var i = 0;i < 5; ){
                
                if(cTower.room.createConstructionSite(startPlace.x, startPlace.y, STRUCTURE_EXTENSION) == OK){
                    i++;
                }
                
                startPlace = getRandomFreePos(startPlace, 1);
            }
            
            cTower.room.memory.level2SetupComplete = true;
        }
     }
 }
 
 function getRandomFreePos(startpos, distance){
    var x,y;
    
    do {
        x = startpos.x + Math.floor(Math.random()*(distance*2+1)) - distance;
        y = startpos.y + Math.floor(Math.random()*(distance*2+1)) - distance;
        console.log(Game.map.getTerrainAt(x,y,startpos.roomName));
    }
    while((x+y)%2 != (startpos.x+startpos.y)%2 || Game.map.getTerrainAt(x,y,startpos.roomName) == 'wall');
    
    return new RoomPosition(x,y,startpos.roomName);
 }

module.exports = roleController;