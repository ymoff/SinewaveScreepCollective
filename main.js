var roleController = require('role.controller');
var roleSpawner = require('role.spawner');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleMeleeAttack = require('role.meleeattack');

module.exports.loop = function () {
    
    //Clear existing mammory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Search for controllers
    var controllers = _.filter(_.values(Game.structures), (structure) =>{
       return structure.structureType == STRUCTURE_CONTROLLER; 
    });
    
    if(controllers){
        for(var i = 0; i < controllers.length; i++){
            var cTower = controllers[i];
            
            if(typeof cTower.room.memory.initialSetupComplete == 'undefined'){
                cTower.room.memory.initialSetupComplete = false;
            }
            
            roleController.run(cTower);
        }
    }
    
    for(var name in Game.spawns){
        var spawn = Game.spawns[name];
        roleSpawner.run(spawn);
    }
    
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        
        switch(creep.memory.role){
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'meleeattack':
                roleMeleeAttack.run(creep);
                break;
        }
    }
}