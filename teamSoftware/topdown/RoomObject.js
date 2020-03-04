//The room object, which keeps track of all entities and objects within it
class Room{
	constructor(canvas, room_array, room_row_index, room_col_index, wall_thickness, left_door, right_door, upper_door, lower_door, room_color, wall_quantity){
        
        //The room needs to know which map or room array it is a part of
        this.room_array = room_array;
        this.canvas = canvas;
        
        //Is the player locked in. On by default.
        this.locked = true;
        
        //Door mats are the areas around each door. No walls can spawn there, to prevent the player getting trapped. You cannot see them by default.
        this.door_mats = [new Rectangle(wall_thickness, (canvas.height/2)-100, 200, 200, "lime"), new Rectangle(canvas.width - wall_thickness - 200, (canvas.height/2)-100, 200, 200, "lime"), new Rectangle((canvas.width/2) - 100, wall_thickness, 200, 200, "lime"), new Rectangle((canvas.width/2) - 100, (canvas.height - wall_thickness - 200), 200, 200, "lime")];
        
        //The room's neighbouring rooms. These denote where the player will end up if they pass through a door. Adjacent rooms do not count as a neighbour unless there is a door between them.
        this.right_neighbour;
        this.left_neighbour;
        this.upper_neighbour;
        this.lower_neighbour;
        
        //The room's position in the map
        this.room_row_index = room_row_index;
        this.room_col_index = room_col_index;
        this.wall_thickness = wall_thickness;
        
        //The border walls around the map. They may or may not have a gate.
		this.left_wall = new Border(0, 0, wall_thickness, canvas.height, "black", left_door);
		this.right_wall = new Border(canvas.width - wall_thickness, 0, wall_thickness, canvas.height, "black", right_door);
		this.upper_wall = new Border(wall_thickness, 0, canvas.width - wall_thickness, wall_thickness, "black", upper_door);
		this.lower_wall = new Border(wall_thickness, canvas.height - wall_thickness, canvas.width - wall_thickness, wall_thickness, "black", lower_door);
        
        //The room's colour
        this.color = room_color;
        
        //A series of lists, each tracking objects within the room.
        this.static_object_list = [];//walls
        this.projectile_object_list = [];//bullets
        this.entity_list = [];//Henrys and stephen
        this.particle_list = [];//Particle effects from bullet impacts
        this.hero_list = [];//This is empty unless the hero is present in the room
        
        this.wall_list = this.generateWalls(wall_quantity, canvas);
        for (var i = 0; i < this.wall_list.length; i++){
            //console.log("Item in wall list: " + i);
            for (var j = 0; j < this.wall_list[i].wall_blocks.length; j++){
                //console.log("block in wall: " + j);
                this.static_object_list.push(this.wall_list[i].wall_blocks[j]);
            }
        }
        this.addBorderBlocks();


    }
    
    //Generate enemies in the room. Takes in the hero, enemy number and a weapon value which determines the Henrys possible strength
    generateEnemies(hero, enemy_quantity, weapon_value){
        var henry_size = 50;
        var spawn_x;
        var spawn_y;
        var new_henry;
        var attempted_spawns = 0;
        for (var i = 0; i < enemy_quantity; i++){
            
            while (attempted_spawns < 50){
                spawn_x = Math.random() * (this.canvas.width - (this.wall_thickness*2) - henry_size) + this.wall_thickness;
                spawn_y = Math.random() * (this.canvas.height - (this.wall_thickness*2) - henry_size) + this.wall_thickness;
                //If the weapon value is five, it is the final room. Stephen should spawn as a result.
                if (weapon_value == 5){
                    new_henry = new Henry(spawn_x, spawn_y, henry_size, henry_size, "#ff9020", hero, this, 400, weapon_value);
                } 
                
                //Otherwise, spawn a Henry
                else {
                    new_henry = new Henry(spawn_x, spawn_y, henry_size, henry_size, "#9c1000", hero, this, 50, Math.round(Math.random() * weapon_value) + 1);
                }
                if (!this.isOnDoorMat(new_henry) && !this.isOnWall(new_henry)){
                    this.entity_list.push(new_henry);
                    this.room_array.entity_counter += 1;
                    attempted_spawns = -1;
                    break;
                }
                attempted_spawns += 1;
            }
            
            if (attempted_spawns >= 50){
                break;
            }
        }
    }
    
    //Adds the border blocks at the edge of the map to the static object list, so that they can have collision
    addBorderBlocks(){
        this.static_object_list.push(this.left_wall.first_block);
        this.static_object_list.push(this.left_wall.third_block);
        if (this.left_wall.gate_status != "open"){
            this.static_object_list.push(this.left_wall.second_block);
        }

        this.static_object_list.push(this.right_wall.first_block);
        this.static_object_list.push(this.right_wall.third_block);
        if (this.right_wall.gate_status != "open"){
            this.static_object_list.push(this.right_wall.second_block);
        }

        this.static_object_list.push(this.upper_wall.first_block);
        this.static_object_list.push(this.upper_wall.third_block);
        if (this.upper_wall.gate_status != "open"){
            this.static_object_list.push(this.upper_wall.second_block);
        }

        this.static_object_list.push(this.lower_wall.first_block);
        this.static_object_list.push(this.lower_wall.third_block);
        if (this.lower_wall.gate_status != "open"){
            this.static_object_list.push(this.lower_wall.second_block);
        }
    }

    //Draw the room, which consists of drawing its entire contents (every item in the particle list, entity list etc.).
	drawSelf(ctx){
        if (this.left_wall != null){
            this.left_wall.drawSelf(ctx);
        }

        if (this.right_wall != null){
            this.right_wall.drawSelf(ctx);
        }

        if (this.upper_wall != null){
            this.upper_wall.drawSelf(ctx);
        }

        if (this.lower_wall != null){
            this.lower_wall.drawSelf(ctx);
        }

        
        //draw the door mats for debugging purposes
        //this.drawDoorMats(ctx);    
        
        
        for (var j = 0; j < this.static_object_list.length; j++){
            this.static_object_list[j].drawSelf(ctx);
            //console.log("drawing static object");
        }
        
        //When drawing entites, they should also be given a chance to act.
        for (var e = 0; e < this.entity_list.length; e++){
            this.entity_list[e].moveAi();
            this.entity_list[e].shoot();
            this.entity_list[e].drawSelf(ctx);
        }
        
        for (var k = 0; k < this.projectile_object_list.length; k++){
            if (this.projectile_object_list[k].stopped){
                this.projectile_object_list.splice(k, 1);
            } else{
                this.projectile_object_list[k].moveBullet();
                this.projectile_object_list[k].drawSelf(ctx);
            }
        }

        for (var l = 0; l < this.particle_list.length; l++){
            if (this.particle_list[l].stopped){
                this.particle_list.splice(l, 1);
            } else{
                this.particle_list[l].moveSelf();
                this.particle_list[l].drawSelf(ctx);
            }
        }
    }
    
    //Generate the walls in the room.
    generateWalls(amount_of_walls, canvas){
	    function not_block_gate(x,y){
	        if(y>=425&&y<=540&&x<=85) {
                return false;//avoid block left gate
            }
            if(y>=425&&y<=540&&x>=1000) {
                return false;// avoid block right gate
            }
            if(y<=80&&x>=480&&x<=795) {
                return false;// avoid block top gate
            }
            if(y>=890&&x>=510&&x<=765) {
                return false;// avoid block low gate
            }
            
            else {
                return true;
            }

        }

        //Ensure that they do not block the player
        function not_block_entity(x,y, room){
            if(y>=165&&y<=250&&x<=750&&x>=525) {
                return false;//avoid block henry
            }
            if((y>=15&&y<=80&&x<=100) && (room.room_row_index == 2 && room.room_col_index == 2)) {
                return false;//avoid block hero
            }

            else {
                return true;
            }
        }
        function islegal_zone(x, y, arrayx, arrayy) {
            var i=0;
            while(i<arrayx.length)
            {
                if(x>arrayx[i]-175&&x<arrayx[i]+175&&y>arrayy[i]-35&&y<arrayy[i]+35) return false;
                else i++;
            }
            return true;
        }   //if you generate a wall(rectangle), assume that it begins from (x,y), then (x-175,x+175),(y-35,y+35) is illegal zone
        var spawn_space = 175;//150
        var wall_type;
        var walls = [];
        var arrayx=[];
        var arrayy=[];
        var attempted_spawns = 0;
        var wall;
        for (var i = 0; i < amount_of_walls; i++){
            wall_type = Math.round(Math.random() * 1);
            while (attempted_spawns < 50){
                var  new_x = Math.round((Math.random() * (canvas.width - this.wall_thickness - spawn_space)) + this.wall_thickness);
                var  new_y = Math.round((Math.random() * (canvas.height - this.wall_thickness - spawn_space)) + this.wall_thickness);
                wall = new Wall(new_x, new_y, wall_type, "black");
                    if(islegal_zone(new_x ,new_y,arrayx,arrayy)&&not_block_gate(new_x,new_y)&&not_block_entity(new_x,new_y, this) && !this.isOnDoorMat(wall))
                    {
                        walls.push(wall);
                        arrayx.push(new_x);
                        arrayy.push(new_y);
                        break;
                    } 
                attempted_spawns++;
                
            }
            
            attempted_spawns = 0;
            
        }

        return walls;
    }
    
    //Check if an object would be on a door mat. This is used when spawning walls.
    isOnDoorMat(object){
            var test_wall = object;
            for (var i = 0; i < this.door_mats.length; i++){
                if ((test_wall.x < this.door_mats[i].x + this.door_mats[i].width && test_wall.x > this.door_mats[i].x) && (test_wall.y < this.door_mats[i].y + this.door_mats[i].height && test_wall.y > this.door_mats[i].y)){
                    return true;
                }
                
                else if ((test_wall.x < this.door_mats[i].x + this.door_mats[i].width && test_wall.x > this.door_mats[i].x) && (test_wall.y + test_wall.height < this.door_mats[i].y + this.door_mats[i].height && test_wall.y + test_wall.height > this.door_mats[i].y)){
                    return true;
                }
                
                else if ((test_wall.x + test_wall.width < this.door_mats[i].x + this.door_mats[i].width && test_wall.x + test_wall.width > this.door_mats[i].x) && (test_wall.y < this.door_mats[i].y + this.door_mats[i].height && test_wall.y > this.door_mats[i].y)){
                    return true;
                }
                
                else if ((test_wall.x + test_wall.width < this.door_mats[i].x + this.door_mats[i].width && test_wall.x + test_wall.width > this.door_mats[i].x) && (test_wall.y + test_wall.height < this.door_mats[i].y + this.door_mats[i].height && test_wall.y + test_wall.height > this.door_mats[i].y)){
                    return true;
                }
                    
            }
                    
            return false;
        }
    
    //Check if an object would spawn on a wall. This is used when spawning Henrys    
    isOnWall(object){
        for (var i = 0; i < this.wall_list.length; i++){
                if ((object.x < this.wall_list[i].x + this.wall_list[i].width + 20 && object.x > this.wall_list[i].x) && (object.y < this.wall_list[i].y + this.wall_list[i].height + 20 && object.y > this.wall_list[i].y)){
                    return true;
                }
                
                else if ((object.x < this.wall_list[i].x + this.wall_list[i].width + 20 && object.x > this.wall_list[i].x) && (object.y + object.height < this.wall_list[i].y + this.wall_list[i].height + 20 && object.y + object.height > this.wall_list[i].y)){
                    return true;
                }
                
                else if ((object.x + object.width < this.wall_list[i].x + this.wall_list[i].width + 20 && object.x + object.width > this.wall_list[i].x) && (object.y < this.wall_list[i].y + this.wall_list[i].height + 20 && object.y > this.wall_list[i].y)){
                    return true;
                }
                
                else if ((object.x + object.width < this.wall_list[i].x + this.wall_list[i].width + 20 && object.x + object.width > this.wall_list[i].x) && (object.y + object.height < this.wall_list[i].y + this.wall_list[i].height + 20 && object.y + object.height > this.wall_list[i].y)){
                    return true;
                }
                    
            }
                    
            return false;
    }
    
    
    //Add an entity to the room's entity list
    addEntity(entity){
        this.entity_list.push(entity);
    }
    
    //Add a projectile to the room's projectile list
    addProjectile(projectile){
        this.projectile_object_list.push(projectile);
    }
    
    //Add a particle to the room's particle list
    addParticle(particle){
	    this.particle_list.push(particle);
    }
    
    //Print out all projectiles and their y speed. Used for debugging.
    printProjectile(){
	    for (var i=0;i<this.projectile_object_list.length;i++){
	        console.log("List item at pos: ", i, "=== ", this.projectile_object_list[i].y_speed);
        }
    }
    
    //When given a border wall, it's gate will be opened
    createGate(border_direction){
        //Which border wall should be opened?
        switch(border_direction){
            case "left":
                var border_wall = this.left_wall;
                this.left_neighbour = this.room_array.array[this.room_row_index][this.room_col_index - 1];
                break;
            case "right":
                var border_wall = this.right_wall;
                this.right_neighbour = this.room_array.array[this.room_row_index][this.room_col_index + 1];
                
                break;
            case "upper":
                var border_wall = this.upper_wall;
                this.upper_neighbour = this.room_array.array[this.room_row_index - 1][this.room_col_index];
                break;
            case "lower":
                this.lower_neighbour = this.room_array.array[this.room_row_index + 1][this.room_col_index];
                var border_wall = this.lower_wall;
                break;
        }
        
        //Once a gate is created, it should be locked by default
        this.lockGates(border_direction);
        
        
        
        
    }
    
    //When given a direction, the appropriate border wall will have its gate locked.
    lockGates(border_direction){
        var border_walls = [this.left_wall, this.right_wall, this.upper_wall, this.lower_wall];
        switch(border_direction){
            case "upper":
                var border_wall = this.upper_wall;
                break;
            
            case "right":
                var border_wall = this.right_wall;
                break;
            
            case "lower":
                var border_wall = this.lower_wall;
                break;
                
            case "left":
                var border_wall = this.left_wall;
                break;
        }
        
        for (var i = 0; i < this.static_object_list.length; i++){
            if (this.static_object_list[i] == border_wall.second_block){
                border_wall.second_block.color = "red";
                border_wall.gate_status = "locked";
                
            }
                        
        }
        
    }
    
    //When this is called, all locked gates will be opened, and the player will be allowed to travel through them again.
    openGates(){
        var border_walls = [this.upper_wall, this.right_wall, this.lower_wall, this.left_wall];
        for (var j = 0; j < border_walls.length + 1; j++){
            if (border_walls[j] != null){
                for (var i = 0; i < this.static_object_list.length + 1; i++){
                    if (this.static_object_list[i] == border_walls[j].second_block && border_walls[j].gate_status === "locked"){
                        this.static_object_list.splice(i, 1);
                        border_walls[j].second_block.color = this.color;
                        border_walls[j].gate_status = "open";
                        console.log("opened gate");
                    }
                }
            }
        }
    }

}
            

