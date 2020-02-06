class Room{
	constructor(canvas, input_number, wall_thickness){
		this.left_wall = new Border(0, 0, wall_thickness, canvas.height, "black", "closed");
		this.right_wall = new Border(canvas.width - wall_thickness, 0, wall_thickness, canvas.height, "black", "closed");
		this.upper_wall = new Border(wall_thickness, 0, canvas.width - wall_thickness, wall_thickness, "black", "closed");
		this.lower_wall = new Border(wall_thickness, canvas.height - wall_thickness, canvas.width - wall_thickness, wall_thickness, "black", "closed");
		this.number= input_number;
        
        this.wall_list = [];
        this.wall_list.push(new Wall(200, 200, 0, "grey"));
        console.log("wall color: " + this.wall_list[0].color);
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
        for (var i = 0; i < this.wall_list.length; i++){
            //console.log("wall color: " + this.wall_list[i].color);
            this.wall_list[i].drawSelf(ctx);
        }
        
        //this.examplewall.drawSelf();
        //console.log("frm room: " + this.examplewall.color);
    }
            
}
