class Room{
	constructor(canvas, input_number, wall_thickness){
		this.left_wall = new Border(0, 0, wall_thickness, canvas.height, "black", "closed");
		this.right_wall = new Border(canvas.width - wall_thickness, 0, wall_thickness, canvas.height, "black", "closed");
		this.upper_wall = new Border(wall_thickness, 0, canvas.width - wall_thickness, wall_thickness, "black", "closed");
		this.lower_wall = new Border(wall_thickness, canvas.height - wall_thickness, canvas.width - wall_thickness, wall_thickness, "black", "closed");
		this.number= input_number;
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
        
    }
            
}
