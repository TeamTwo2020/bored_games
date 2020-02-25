class Henry extends Entity{
    constructor(x, y, width, height, color, entity, room, health){
        super(x, y, width, height, color, room, health);
        //this.shot=false;
        this.entity=entity;
        this.room = room;
        //console.log("room index in henry: " + this.room.room_index);
        //console.log("Henry room is : " + room.returnIndex());
        //this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "gold", this.entity, this.room);
        this.shot_timer = 40;
        this.maneuver_timer=0;
        this.maneuver_x=0;
        this.maneuver_y=0;
    }
    

    shoot(){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(this.middle.x, this.middle.y, 5, 5, "navy", this.entity, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = 40;
        } else {
            this.shot_timer -= 1;
        }
        
        
    }

    moveAi(){
        if (this.maneuver_timer>0){
            //if theres collision assign a new x and y point to these
            this.aiMovement(this.maneuver_x, this.maneuver_y);
            this.maneuver_timer-=1;
        }else{
            this.aiMovement(this.entity.middle.x, this.entity.middle.y);
        }
    }

    //ai stuff
    aiMovement(dest_x, dest_y){
        var moving={
            moving_up: false,
            moving_down: false,
            moving_left: false,
            moving_right: false,

            moving_up_speed: 0,
            moving_down_speed: 0,
            moving_left_speed: 0,
            moving_right_speed: 0,

            colliding_up: false,
            colliding_down: false,
            colliding_left: false,
            colliding_right: false

        };
        //update x and y position here to be close to target using trig
        //assuming
        //x speed is x_dist/y_dist x5:
        //put the smaller of x/y on top of other in fraction to get the percentage
        if (!(this.checkCollisionWithPlayerObject()) && !(this.checkCollisionWithStaticObjects())){
            //var targetLeft=false;
            //var targetUp=false;

            var x_dist=dest_x - this.middle.x;

            if(x_dist < 0){
                moving.moving_left=true;
                x_dist*=-1;
            }else{
                moving.moving_right=true;
            }
            //compare two entities
            var y_dist=dest_y - this.middle.y;
            if(y_dist < 0){
                moving.moving_up=true;
                y_dist*=-1;
            }else{
                moving.moving_down=true;
            }

            var total_dist=x_dist+y_dist;

            var x_speed=(x_dist / total_dist)*2;
            var y_speed=(y_dist/total_dist)*2;

            //console.log("this.x_speed: ", this.x_speed, "-- this.y_speed: ", this.y_speed);
            //console.log("MOVING: ", x_speed, y_speed);
            if (moving.moving_left==true)  {moving.moving_left_speed=x_speed;}
            if (moving.moving_right==true)  {moving.moving_right_speed=x_speed;}
            if (moving.moving_up==true)  {moving.moving_up_speed=y_speed;}
            if (moving.moving_down==true)  {moving.moving_down_speed=y_speed;}
        }
        else if (this.checkCollisionWithPlayerObject()){
            this.entity.health=0;
        }

        for (var i = 0; i < this.room.static_object_list.length; i++) {
            if (moving.moving_up_speed > 0) {
                if (testCollision(this.x, this.y - 5, this.width, this.height, this.room.static_object_list[i])) {
                    moving.moving_up = false;
                    moving.colliding_up = true;

                } else {
                    moving.moving_up = true;

                }
            }
            if (moving.moving_down_speed > 0) {
                if (testCollision(this.x, this.y + 5, this.width, this.height, this.room.static_object_list[i])) {
                    moving.moving_down = false;
                    moving.colliding_down = true;

                } else {
                    moving.moving_down = true;

                }
            }
            if (moving.moving_left_speed > 0) {
                if (testCollision(this.x - 5, this.y, this.width, this.height, this.room.static_object_list[i])) {
                    moving.moving_left = false;
                    moving.colliding_left = true;

                } else {
                    moving.moving_left = true;
                }
            }
            if (moving.moving_right_speed > 0) {
                if (testCollision(this.x + 5, this.y, this.width, this.height, this.room.static_object_list[i])) {
                    moving.moving_right = false;
                    moving.colliding_right = true;

                } else {
                    moving.moving_right = true;
                }
            }
        }

        //console.log("r1 o1: " + rooms[0].static_object_list[0].x + " " + rooms[0].static_object_list[0].y + "\nr2 o1: " + rooms[1].static_object_list[0].x + " " + rooms[1].static_object_list[0].y);
        if (moving.colliding_up == false) {
            this.y = this.y - moving.moving_up_speed;
        }else if(moving.colliding_up == true){
            if (moving.moving_left==true){
                this.maneuver_x=dest_x-100;
                this.maneuver_y=dest_y;
                this.maneuver_timer=30;
            }else{
                this.maneuver_x=dest_x+100;
                this.maneuver_y=dest_y;
                this.maneuver_timer=30;
            }
        }

        //if henry is moving left when he collides up then move 100 left and vice versa

        if (moving.colliding_down == false) {
            this.y = this.y + moving.moving_down_speed;
        }

        if (moving.colliding_left == false) {
            this.x = this.x - moving.moving_left_speed;
        }else if(moving.colliding_left == true){
            if (moving.moving_up==true){
                this.maneuver_x=dest_x;
                this.maneuver_y=dest_y-100;
                this.maneuver_timer=30;
            }else{
                this.maneuver_x=dest_x;
                this.maneuver_y=dest_y+100;
                this.maneuver_timer=30;
            }
        }

        if (moving.colliding_right == false) {
            this.x = this.x + moving.moving_right_speed;
        }
    }
}


