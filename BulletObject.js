class Bullet extends Rectangle{
    constructor(x, y, width, height, color, entity){
        super(x, y, width, height, color);
        this.entity=entity;
        this.targetAcquired=false;
        this.x_speed=0;
        this.y_speed=0;
        this.targetLeft=false;
        this.targetUp=false;
    }
    
    moveBullet(ctx, shot){
        //if bullet doesnt collide with anything
        //  draw the bullet at a closer position to the target's middle (using trigonometry)
        //else dont draw the bullet
        if (!(testCollision(this.middle.x, this.middle.y, this.width, this.height, this.entity))){
            if(!(this.targetAcquired)){
                //update x and y position here to be close to target using trig
                //assuming 
                //x speed is x_dist/y_dist x5:
                //put the smaller of x/y on top of other in fraction to get the percentage
                var x_dist=this.entity.middle.x - this.middle.x;
                if(x_dist < 0){
                    this.targetLeft=true;
                    x_dist*=-1;
                }
                var y_dist=this.entity.middle.y - this.middle.y ;
                if(y_dist < 0){
                    this.targetUp=true;
                    y_dist*=-1;
                }
                
                var total_dist=x_dist+y_dist;
                
                this.x_speed=(x_dist / total_dist)*10;
                this.y_speed=(y_dist/total_dist)*10;
                
                this.targetAcquired=true;
            }
            
            //console.log("this.x_speed: ", this.x_speed, "-- this.y_speed: ", this.y_speed);
            
            if (this.targetLeft==true){
                this.x-=this.x_speed;
            }else{
                this.x+=this.x_speed;
            }
            if (this.targetUp==true){
                this.y-=this.y_speed;
            }else{
                this.y+=this.y_speed;
            }
            this.drawSelf(ctx);
        }else{
            shot=false;
        }
        return shot;
    }
}
