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
        this
        this.collide_timer=0;
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

    //ai stuff
    moveAi(){
        //update x and y position here to be close to target using trig
        //assuming
        //x speed is x_dist/y_dist x5:
        //put the smaller of x/y on top of other in fraction to get the percentage
        if (this.collide_timer==0){
            if (!(this.checkCollisionWithPlayerObject()) && !(this.checkCollisionWithStaticObjects())){
                var targetLeft=false;
                var targetUp=false;

                var x_dist=this.entity.middle.x - this.middle.x;

                if(x_dist < 0){
                    targetLeft=true;
                    x_dist*=-1;
                }
                //compare two entities
                var y_dist=this.entity.middle.y - this.middle.y ;
                if(y_dist < 0){
                    targetUp=true;
                    y_dist*=-1;
                }

                var total_dist=x_dist+y_dist;

                var x_speed=(x_dist / total_dist)*2;
                var y_speed=(y_dist/total_dist)*2;

                //console.log("this.x_speed: ", this.x_speed, "-- this.y_speed: ", this.y_speed);
                //console.log("MOVING: ", x_speed, y_speed);
                if (targetLeft==true)  {this.x-=x_speed;}
                else{this.x+=x_speed;}
                if (targetUp==true){this.y-=y_speed;}
                else{this.y+=y_speed;}

            }
            else if (this.checkCollisionWithPlayerObject()){
                this.entity.health=0;
            }
            else{
                this.collide_timer=60;
            }
        }
        else{ //if colliding with static object
            this.collide_timer-=1;

            var targetLeft=false;
            var targetUp=false;

            var x_dist=this.entity.middle.x - this.middle.x;

            if(x_dist < 0){
                targetLeft=true;
                x_dist*=-1;
            }
            //compare two entities
            var y_dist=this.entity.middle.y - this.middle.y ;
            if(y_dist < 0){
                targetUp=true;
                y_dist*=-1;
            }

            var total_dist=x_dist+y_dist;

            var x_speed=(x_dist / total_dist)*2;
            var y_speed=(y_dist/total_dist)*2;

            //if theres collision with a wall move away from the player's location
            //using targetLeft we know what direction the ai is moving, we can therefore try to move around the blocking object
            //need to accurately check the 4 zones

            //to do this there there needs to be a way to check in which direction the collision occured
            if (targetLeft==true)  {this.x+=x_speed;}
            else{this.x-=x_speed;}
            if (targetUp==true){this.y+=y_speed;}
            else{this.y-=y_speed;}
        }
    }
}


