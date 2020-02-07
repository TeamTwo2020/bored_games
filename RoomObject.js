class Room{
	constructor(canvas, input_number, wall_thickness){
        this.wall_thickness = wall_thickness;
		this.left_wall = new Border(0, 0, wall_thickness, canvas.height, "black", "closed");
		this.right_wall = new Border(canvas.width - wall_thickness, 0, wall_thickness, canvas.height, "black", "closed");
		this.upper_wall = new Border(wall_thickness, 0, canvas.width - wall_thickness, wall_thickness, "black", "closed");
		this.lower_wall = new Border(wall_thickness, canvas.height - wall_thickness, canvas.width - wall_thickness, wall_thickness, "black", "closed");
		this.number= input_number;
        
        this.static_object_list = [];
        this.projectile_object_list = [];
        this.entity_list = [];
        this.room_contents_list = [this.static_object_list, this.projectile_object_list, this.entity_list];
        
        //console.log("wall color: " + this.wall_list[0].color);
        this.wall_list = this.generateWalls(5, canvas);
        for (var wallin = 0; wallin < this.wall_list.length; wallin++){
            console.log("wall: " + wallin + "\nX: " + this.wall_list[wallin].x + "\nY: " + this.wall_list[wallin].y);
        }
        //console.log("wall list length after generation: " + this.wall_list.length);
        for (var i = 0; i < this.wall_list.length; i++){
            console.log("Item in wall list: " + i);
            for (var j = 0; j < this.wall_list[i].wall_blocks.length; j++){
                //console.log("block in wall: " + j);
                this.static_object_list.push(this.wall_list[i].wall_blocks[j]);
            }
        }
        
           
        //this.static_object_list.push(new Wall(200, 200, 0, "black"));
        
    }
	
	drawSelf(ctx){
        //console.log("left wall null?" + this.left_wall + "\nRight wall null?" + this.right_wall);
        
        if (this.left_wall != null){
            this.left_wall.drawSelf(ctx);
        }
        
        if (this.right_wall != null){
            this.right_wall.drawSelf(ctx);
        }
        
        if (this.upper_wall != null){
            //console.log("drawing upper wall");
            this.upper_wall.drawSelf(ctx);
        }
        
        if (this.lower_wall != null){
            this.lower_wall.drawSelf(ctx);
        }
        
        //console.log("wall list len: " + this.wall_list.length);
        for (var i = 0; i < this.room_contents_list[0].length; i++){
            //console.log("drawing wall at x: " + this.room_contents_list[0][i].x);
            //console.log("wall color: " + this.wall_list[i].color);
            this.room_contents_list[0][i].drawSelf(ctx);
            //console.log("Drawing something...");
        }
        
        //this.examplewall.drawSelf();
        //console.log("frm room: " + this.examplewall.color);
    }
    
    addEntity(entity){
        this.entity_list.push(entity);
    }
    
    generateWalls(amount_of_walls, canvas){
        var spawn_space = 150;
        var walls = [];
        var new_x = Math.round((Math.random() * (canvas.width - this.wall_thickness - spawn_space)) + this.wall_thickness);
        var new_y = Math.round((Math.random() * (canvas.height - this.wall_thickness - spawn_space)) + this.wall_thickness);
        var generation_attempts = 100;
        
        for (var i = 0; i < amount_of_walls; i++){
            console.log("amount of walls needed: " + amount_of_walls + "\namount of walls currently: " + walls.length);
            for (var j = 0; j < walls.length; j++){
                console.log("for each wall...");
                while (generation_attempts > 0){
                    if (((new_x + spawn_space > walls[j].x) && (new_y + spawn_space < walls[j].y)) || ((new_x < walls[j].x + spawn_space) && (new_y + spawn_space < walls[j].y)) || ((new_x < walls[j].x + spawn_space) && (new_y < walls[j].y + spawn_space)) || ((new_x + spawn_space > walls[j].x) && (new_y < walls[j].y + spawn_space))){
                        generation_attempts -= 1;
                        
                        console.log("attempt x: " + new_x + "\nattempt y: " + new_y);
                        
                        new_x = Math.round((Math.random() * (canvas.width - this.wall_thickness - spawn_space)) + this.wall_thickness);
                        new_y = Math.round((Math.random() * (canvas.height - this.wall_thickness - spawn_space)) + this.wall_thickness);
                        
                    } else{
                        generation_attempts = 100;
                        break;
                    }
                                            
                    if (generation_attempts <= 0){
                        break;
                    }
                }
                
                if (generation_attempts <= 0){
                    break;
                }
                    
                        
                }
            
            if (generation_attempts <= 0){
                break;
            }
        
            walls.push(new Wall(new_x, new_y, 0, "black"));
            var new_x = Math.round((Math.random() * (canvas.width - this.wall_thickness - spawn_space)) + this.wall_thickness);
            var new_y = Math.round((Math.random() * (canvas.height - this.wall_thickness - spawn_space)) + this.wall_thickness);
            
        }
        console.log("Finished generating walls. Current list length: " + walls.length);
        return walls;
    }
    
    
    
}
            
/*
 * if (((new_x + spawn_space > walls[j].x) && (new_y + spawn_space < walls[j].y)) || ((new_x < walls[j].x + spawn_space) && (new_y + spawn_space < walls[j].y)) || ((new_x < walls[j].x + spawn_space) && (new_y < walls[j].y + spawn_space)) || ((new_x + spawn_space > walls[j].x) && (new_y < walls[j].y + spawn_space)))*/

