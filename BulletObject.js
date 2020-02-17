class Bullet extends Rectangle{
    constructor(x, y, width, height, color, entity, room){
        super(x, y, width, height, color);
        this.entity = entity;
        this.room = room;
        //console.log("Room is " + room);
        this.room.addProjectile(this);
        this.stopped = false;
    }
    
    
    moveBullet(ctx, shot){
        //if bullet doesnt collide with anything
        //  draw the bullet at a closer position to the target's middle (using trigonometry)
        //else dont draw the bullet
        if (!(testCollision(this.x, this.y, this.width, this.height, this.entity)) && !(this.checkCollisionWithStaticObjects())){
            //update x and y position here to be close to target using trig
            //assuming 
            //x speed is x_dist/y_dist x5:
            //put the smaller of x/y on top of other in fraction to get the percentage
            var left=false;
            var up=false;
            var x_speed;
            var y_speed;
            var x_dist=this.entity.middle.x - this.x ;
            if(x_dist < 0){
                left=true;
                x_dist*=-1;
            }
            var y_dist=this.entity.middle.y - this.y ;
            if(y_dist < 0){
                up=true;
                y_dist*=-1;
            }
            
            if(x_dist<y_dist){
                x_speed=(x_dist / y_dist) *10;
                y_speed=10 - x_speed;
            }else if(x_dist>y_dist){
                y_speed=(y_dist / x_dist) *10;
                x_speed=10 - y_speed;
            }else{  //x and y are equal
                x_speed=5;
                y_speed=5;
            }
            //console.log("x_speed: ", x_speed, "-- y_speed: ", y_speed);
            
            if (left==true){
                this.x-=x_speed;
            }else{
                this.x+=x_speed;
            }
            if (up==true){
                this.y-=y_speed;
            }else{
                this.y+=y_speed;
            }
            //this.drawSelf(ctx);
        }else{
            shot=false;
            this.stopped = true;
        }
        return shot;
    }
    
    checkCollisionWithStaticObjects(){
        //console.log("checking collision with static objects: " + this.room.static_object_list.length);
        
        for (var i = 0; i < this.room.static_object_list.length; i++){
            //console.log("checking collision in for loop...");
            if (testCollision(this.x, this.y, this.width, this.height, this.room.static_object_list[i])){
                return true;
            } else {
                //console.log("not colliding");
            }
        }
        
        return false;
    }
}
