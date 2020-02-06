class Room{
	constructor(canvas, input_number){
		this.left_wall = new Border(0, 0, canvas.width, canvas.height, "black", "closed");
		this.right_wall;
		this.upper_wall;
		this.lower_wall;
		this.number= input_number;
	}
}
