class Hero1 extends Entity{
    constructor(canvas, x, y, width, height, color, room_list, room,health,direct){
        super(x, y, width, height, color, room,health);
        
        this.canvas = canvas;
        console.log("canvas width is " + this.canvas.width);
        this.bullet = null;
        this.room_list = room_list;
        console.log("generate a bullet");
        this.direct=direct;
        this.shot=false;
        console.log("hero says its room is " + this.room + " at r: " + this.room.room_row_index);

    }

   generate(ctx){
       //var Entitytemp = new Henry(700, 200, 50, 50, "red", hero, new_room,50);
       this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "navy", henry, this.room);
    }
    
    outOfBounds(){
        //Check if the player is about to leave the canvas. The only way they could get past the border would be if they passed through a gate
        if (hero.x < 0 && this.room.left_neighbour != null) {
            this.room = this.room.left_neighbour;
            this.room_list.current_room = this.room;
            this.x = this.canvas.width - this.room.wall_thickness - this.width;
        } 
        
        else if (hero.x + hero.width > this.canvas.width && this.room.right_neighbour != null){
            this.room = this.room.right_neighbour;
            this.room_list.current_room = this.room;
            this.x = this.room.wall_thickness;
        } 
        
        else if (hero.y < 0 && this.room.upper_neighbour != null){
            this.room = this.room.upper_neighbour;
            this.room_list.current_room = this.room;
            this.y = this.canvas.height - this.room.wall_thickness;
        } 
        
        else if (hero.y + hero.height > this.canvas.height && this.room.lower_neighbour != null){
            this.room = this.room.lower_neighbour;
            this.room_list.current_room = this.room;
            this.y = this.room.wall_thickness;
        }

        
    }
}

