class Bullet extends Rectangle{
    constructor(x, y, width, height, color, entity, room){
        super(x, y, width, height, color);
        this.entity=entity;
        this.room = room;
        this.room.addProjectile(this);
        this.stopped = false;
        this.targetAcquired=false;
        this.x_speed=0;
        this.y_speed=0;
        this.targetLeft=false;
        this.targetUp=false;
        this.total_speed_multiplier = 8;
    }
    
    
    moveBullet(ctx, shot){
        //if bullet doesnt collide with anything
        //  draw the bullet at a closer position to the target's middle (using trigonometry)
        console.log("moving bullet");

        //else dont draw the bullet
     //   if (!(testCollision(this.x, this.y, this.width, this.height, this.entity)) && !(this.checkCollisionWithStaticObjects()))
            if (!(this.checkCollisionWithPlayerObject()) && !(this.checkCollisionWithStaticObjects()))
        {
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
                //compare two entities
                var y_dist=this.entity.middle.y - this.middle.y ;
                if(y_dist < 0){
                    this.targetUp=true;
                    y_dist*=-1;
                }
                
                var total_dist=x_dist+y_dist;
                
                this.x_speed=(x_dist / total_dist)*this.total_speed_multiplier;
                this.y_speed=(y_dist/total_dist)*this.total_speed_multiplier;
                
                this.targetAcquired=true;
            }
            
            //console.log("this.x_speed: ", this.x_speed, "-- this.y_speed: ", this.y_speed);
            
            if (this.targetLeft==true)  {this.x-=this.x_speed;}
            else{this.x+=this.x_speed;}
            if (this.targetUp==true){this.y-=this.y_speed;}
            else{this.y+=this.y_speed; }//this.drawSelf(ctx);
        }
       //  else if(testCollision(this.x, this.y, this.width, this.height, this.entity) )
       // { //alert("you are defeated");//this.entity.clear1();
        //}

        else{
            //shot=false;
            this.stopped = true;
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-up"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-up-right"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-right"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-down-right"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-down"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-down-left"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-left"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 10, Math.random()*10, "straight-up-left"));
            this.room.particle_list.push(new Particle(this.x, this.y, 3, 4, this.color, 4, 8));
            this.room.particle_list.push(new Particle(this.x, this.y, 3, 4, this.color, 4, 8));

            }
        //return shot;
    }
    
    checkCollisionWithStaticObjects(){
        //console.log("checking collision with static objects: " + this.room.static_object_list.length);
        
        for (var i = 0; i < this.room.static_object_list.length; i++){
            //console.log("checking collision in for loop..."+i);
            if (testCollision(this.x, this.y, this.width, this.height, this.room.static_object_list[i])){
                return true;
            } else {
                //console.log("not colliding");
            }
        }
        
        return false;
    }

    checkCollisionWithPlayerObject(){
        if (testCollision(this.x, this.y, this.width, this.height, this.entity)) {
          if(this.entity.health>0)
          { this.entity.takeDamage(10);return true;}
          else alert("game over");

        } else {
            return false;
        }
    }
}
