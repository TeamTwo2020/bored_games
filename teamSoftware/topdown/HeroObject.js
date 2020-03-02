class Hero extends Entity{
    constructor(canvas, x, y, width, height, color, room_list, room, health, direct){
        super(x, y, width, height, color, room, health);
        
        this.canvas = canvas;
        this.bullet = null;
        this.room_list = room_list;
        //console.log("generate a bullet");
        this.direct=direct;
        this.shot=false;
        //console.log("hero says its room is " + this.room + " at r: " + this.room.room_row_index);
        this.gun=new Gun(this.room, 1, 1);
    }
/*
   generate(target_x, target_y){
       //var Entitytemp = new Henry(700, 200, 50, 50, "red", hero, new_room,50);
       this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, 8, 8, "navy", target_x, target_y, 1, this.room);
    }*/

    shoot(target_x, target_y){
        this.gun.shootGun(target_x, target_y, this.middle.x, this.middle.y);
        //console.log("this.middle.x: ", this.middle.x);
        //console.log("this.middle.y: ", this.middle.y);
    }
    
    outOfBounds(){
        //Check if the player is about to leave the canvas. The only way they could get past the border would be if they passed through a gate
        if (hero.x < 0 && this.room.left_neighbour != null) {
            this.room.hero_list = [];
            this.room = this.room.left_neighbour;
            this.room_list.current_room = this.room;
            this.room.hero_list.push(this);
            this.gun.room=this.room;
            this.x = this.canvas.width - this.room.wall_thickness - this.width - 1;
            console.log("player is now in row: " + this.room.room_row_index + "  col: " +  this.room.room_col_index + "\nList of entities: " + this.room.entity_list);
        } 
        
        else if (hero.x + hero.width > this.canvas.width && this.room.right_neighbour != null){
            this.room.hero_list = [];
            this.room = this.room.right_neighbour;
            this.room_list.current_room = this.room;
            this.room.hero_list.push(this);
            this.gun.room=this.room;
            this.x = this.room.wall_thickness + 1;
            console.log("player is now in row: " + this.room.room_row_index + "  col: " +  this.room.room_col_index + "\nList of entities: " + this.room.entity_list);
        } 
        
        else if (hero.y < 0 && this.room.upper_neighbour != null){
            this.room.hero_list = [];
            this.room = this.room.upper_neighbour;
            this.room_list.current_room = this.room;
            this.room.hero_list.push(this);
            this.gun.room=this.room;
            this.y = this.canvas.height - this.room.wall_thickness - this.height - 1;
            console.log("player is now in row: " + this.room.room_row_index + "  col: " +  this.room.room_col_index + "\nList of entities: " + this.room.entity_list);
        } 
        
        else if (hero.y + hero.height > this.canvas.height && this.room.lower_neighbour != null){
            this.room.hero_list = [];
            this.room = this.room.lower_neighbour;
            this.room_list.current_room = this.room;
            this.room.hero_list.push(this);
            this.gun.room=this.room;
            this.y = this.room.wall_thickness + 1;
            console.log("player is now in row: " + this.room.room_row_index + "  col: " +  this.room.room_col_index + "\nList of entities: " + this.room.entity_list);
        }

        
    }
}


