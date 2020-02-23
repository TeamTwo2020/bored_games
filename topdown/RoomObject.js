class Room{
	constructor(canvas, room_index, wall_thickness, left_door, right_door, upper_door, lower_door){
        this.room_index = room_index;
        this.wall_thickness = wall_thickness;
		this.left_wall = new Border(0, 0, wall_thickness, canvas.height, "black", left_door);
		this.right_wall = new Border(canvas.width - wall_thickness, 0, wall_thickness, canvas.height, "black", right_door);
		this.upper_wall = new Border(wall_thickness, 0, canvas.width - wall_thickness, wall_thickness, "black", upper_door);
		this.lower_wall = new Border(wall_thickness, canvas.height - wall_thickness, canvas.width - wall_thickness, wall_thickness, "black", lower_door);

        this.static_object_list = [];//wall
        this.projectile_object_list = [];//bullet
        this.entity_list = [];//hero
        this.room_contents_list = [this.static_object_list, this.projectile_object_list, this.entity_list];
        this.wall_list = this.generateWalls(10, canvas);
        for (var i = 0; i < this.wall_list.length; i++){
            console.log("Item in wall list: " + i);
            for (var j = 0; j < this.wall_list[i].wall_blocks.length; j++){
                //console.log("block in wall: " + j);
                this.static_object_list.push(this.wall_list[i].wall_blocks[j]);
            }
        }

        //add borders to static objects
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
        if (this.right_wall.gate_status != "open"){
            this.static_object_list.push(this.lower_wall.second_block);
        }


        //this.static_object_list.push(new Wall(200, 200, 0, "black"));

    }

    returnIndex(){
        return this.room_index;
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
        for (var i = 0; i < this.room_contents_list.length; i++){
            //console.log("drawing wall at x: " + this.room_contents_list[0][i].x);
            //console.log("wall color: " + this.wall_list[i].color);
            for (var j = 0; j < this.static_object_list.length; j++){
                this.static_object_list[j].drawSelf(ctx);
                //console.log("drawing static object");
            }

            for (var e = 0; e < this.entity_list.length; e++){
                this.entity_list[e].drawSelf(ctx);
            }
            //console.log("Drawing something...");
            for (var k = 0; k < this.projectile_object_list.length; k++){
                if (this.projectile_object_list[k].stopped){
                    this.projectile_object_list.splice(k, 1);
                } else{
                    this.projectile_object_list[k].drawSelf(ctx);
                }
            }
        }

        //this.examplewall.drawSelf();
        //console.log("frm room: " + this.examplewall.color);
    }

    addEntity(entity){
        this.entity_list.push(entity);
    }




    generateWalls(amount_of_walls, canvas){
	    function not_block_gate(x,y){
	        if(y>=460&&y<=540&&x<=80) return false;//avoid block left gate
            if(y>=460&&y<=540&&x>=1215) return false;// avoid block right gate
            if(y<=80&&x>=540&&x<=795) return false;// avoid block top gate
            if(y>=890&&x>=540&&x<=795) return false;// avoid block low gate
            else return true;

        }



        function not_block_entity(x,y){
            if(y>=155&&y<=250&&x<=750&&x>=525) return false;//avoid block henry
            if(y>=15&&y<=35&&x<=100) return false;//avoid block henry

            else return true;

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
        var walls = [];
        var arrayx=[];
        var arrayy=[];
        var new_x = Math.round((Math.random() * (canvas.width - this.wall_thickness - spawn_space)) + this.wall_thickness);
        // wall_thickness has been initialized in the room class
        var new_y = Math.round((Math.random() * (canvas.height - this.wall_thickness - spawn_space)) + this.wall_thickness);
        walls.push(new Wall(new_x, new_y, 0, "black"));
        arrayx.push(new_x);
        arrayy.push(new_y);
        for (var i = 1; i < amount_of_walls; ){
            new_x = Math.round((Math.random() * (canvas.width - this.wall_thickness - spawn_space)) + this.wall_thickness);
            new_y = Math.round((Math.random() * (canvas.height - this.wall_thickness - spawn_space)) + this.wall_thickness);
            if(islegal_zone(new_x ,new_y,arrayx,arrayy)&&not_block_gate(new_x,new_y)&&not_block_entity(new_x,new_y))
            {
                walls.push(new Wall(new_x, new_y, 0, "black"));
                arrayx.push(new_x);
                arrayy.push(new_y);
                i++;
            }
}
        return walls;
    }

    assignNeighbour(direction, room){
        if (direction == "upper"){
            this.upper_neighbour = room;
        } else if (direction == "lower"){
            this.lower_neighbour = room;
        } else if (direction == "left"){
            this.left_neighbour = room;
        } else if (direction == "right"){
            this.right_neighbour = room;
        }
    }

    addEntity(entity){
        this.entity_list.push(entity);
    }

    addProjectile(projectile){
        //console.log("projectile added");
        this.projectile_object_list.push(projectile);
    }

}
            
