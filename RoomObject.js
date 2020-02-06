class Room{
	constructor(canvas, input_number, wall_thickness){
		this.left_wall = new Border(0, 0, wall_thickness, canvas.height, "black", "closed");
		this.right_wall;
		this.upper_wall;
		this.lower_wall;
		this.number= input_number;
	}
}
