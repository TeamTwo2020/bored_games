class Henry extends Entity{
    constructor(x, y, width, height, color, entity, room, health, gun){
        super(x, y, width, height, color, room, health);
        //this.shot=false;
        this.entity=entity;
        this.hostile = true;
        this.room = room;
        //console.log("room index in henry: " + this.room.room_index);
        //console.log("Henry room is : " + room.returnIndex());
        //this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "gold", this.entity, this.room);
        this.gun=new Gun(this.room, gun, 2);

        this.shot_timer = 40;
        this.maneuver_timer=0;
        this.maneuver_x=0;
        this.maneuver_y=0;
        this.just_collided_left=false;
        this.just_collided_right=false;
        this.just_collided_up=false;
        this.just_collided_down=false;
    }
    

    shoot(){
        this.gun.shootGun(this.entity.middle.x, this.entity.middle.y, this.middle.x, this.middle.y);
    }

    moveAi(){
        if (this.maneuver_timer>0){
            //if theres collision assign a new x and y point to these
            this.henryShuffle(this.maneuver_x, this.maneuver_y);
            this.maneuver_timer-=1;
        }else{
            this.henryShuffle(this.entity.middle.x, this.entity.middle.y);
        }
    }

    //ai stuff
    henryShuffle(dest_x, dest_y){
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

        var already_colliding=false;
        //Add a maneuver left etc method
        if (moving.colliding_up == false) {
            this.y = this.y - moving.moving_up_speed;
        }else if (moving.colliding_up == true && moving.colliding_left == true) {
            already_colliding=true;
            this.collideUpAndLeft(dest_x, dest_y);
        }else if (moving.colliding_up == true && moving.colliding_right == true) {
            already_colliding=true;
            this.collideUpAndRight(dest_x, dest_y);
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

        if (!already_colliding) {
            if (moving.colliding_down == false) {
                this.y = this.y + moving.moving_down_speed;
            } else if (moving.colliding_down == true && moving.colliding_left == true) {
                already_colliding = true;
                this.collideDownAndLeft(dest_x, dest_y);
            } else if (moving.colliding_down == true && moving.colliding_right == true) {
                already_colliding = true;
                this.collideDownAndRight(dest_x, dest_y)
            } else if (moving.colliding_down == true) {
                if (moving.moving_left == true) {
                    this.maneuver_x = dest_x - 100;
                    this.maneuver_y = dest_y;
                    this.maneuver_timer = 30;
                } else {
                    this.maneuver_x = dest_x + 100;
                    this.maneuver_y = dest_y;
                    this.maneuver_timer = 30;
                }
            }
        }

        if (!already_colliding) {
            if (moving.colliding_left == false) {
                this.x = this.x - moving.moving_left_speed;
            } else if (moving.colliding_left == true) {
                if (moving.moving_up == true) {
                    this.maneuver_x = dest_x;
                    this.maneuver_y = dest_y - 100;
                    this.maneuver_timer = 30;
                } else {
                    this.maneuver_x = dest_x;
                    this.maneuver_y = dest_y + 100;
                    this.maneuver_timer = 30;
                }
            }
        }

        if (!already_colliding) {
            if (moving.colliding_right == false) {
                this.x = this.x + moving.moving_right_speed;
            } else if (moving.colliding_right == true) {
                if (moving.moving_up == true) {
                    this.maneuver_x = dest_x;
                    this.maneuver_y = dest_y - 100;
                    this.maneuver_timer = 30;
                } else {
                    this.maneuver_x = dest_x;
                    this.maneuver_y = dest_y + 100;
                    this.maneuver_timer = 30;
                }
            }
        }
    }

    collideUpAndLeft(dest_x, dest_y){
        if (this.just_collided_left == false){  //to stop repeated collisions
            this.just_collided_left=true;
            this.maneuver_x = dest_x+100;
            this.maneuver_y = dest_y;
            this.maneuver_timer = 30;
        }else{
            this.just_collided_left=false;
            this.maneuver_x = this.x;
            this.maneuver_y = dest_y+100;
            this.maneuver_timer = 100;
        }
    }

    collideUpAndRight(dest_x, dest_y){
        if (this.just_collided_right == false){
            this.just_collided_right=true;
            this.maneuver_x = dest_x-100;
            this.maneuver_y = dest_y;
            this.maneuver_timer = 30;
        }else{
            this.just_collided_right=false;
            this.maneuver_x = this.x;
            this.maneuver_y = dest_y+100;
            this.maneuver_timer = 100;
        }
    }

    collideDownAndLeft(dest_x, dest_y){
        if (this.just_collided_left == false){  //to stop repeated collisions
            this.just_collided_left=true;
            this.maneuver_x = dest_x+100;
            this.maneuver_y = dest_y;
            this.maneuver_timer = 30;
        }else{
            this.just_collided_left=false;
            this.maneuver_x = this.x;
            this.maneuver_y = dest_y-100;
            this.maneuver_timer = 30;
        }
    }

    collideDownAndRight(dest_x, dest_y){
        if (this.just_collided_right == false) {
            this.just_collided_right = true;
            this.maneuver_x = dest_x-100;
            this.maneuver_y = dest_y;
            this.maneuver_timer = 30;
        }else{
            this.just_collided_right = false;
            this.maneuver_x = this.x;
            this.maneuver_y = dest_y-100;
            this.maneuver_timer = 30;
        }
    }
}
