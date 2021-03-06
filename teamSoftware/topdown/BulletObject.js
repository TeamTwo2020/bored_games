class Bullet extends Rectangle{
    constructor(x, y, width, height, travel_speed, damage, color, target_x, target_y, source, room){
        super(x, y, width, height, color);
        this.travel_speed=travel_speed;
        this.damage=damage;
        this.target_x=target_x;
        this.target_y=target_y;
        this.source = source;
        this.room = room;
        this.room.addProjectile(this);
        this.stopped = false;
        this.targetAcquired=false;
        this.x_speed=0;
        this.y_speed=0;
        this.targetLeft=false;
        this.targetUp=false;
    }
    
    
    moveBullet(){
        //if bullet doesnt collide with anything
        //  draw the bullet at a closer position to the target's middle (using trigonometry)
        if (!(this.checkCollisionWithPlayerObject()) && !(this.checkCollisionWithStaticObjects()))
        {
            if(!(this.targetAcquired)){
                //update x and y position here to be close to target using trig
                //assuming 
                //x speed is x_dist/y_dist x5:
                //put the smaller of x/y on top of other in fraction to get the percentage
                var x_dist=this.target_x - this.middle.x;
                /*
                console.log("target_x: ", this.target_x);
                console.log("source x: ", this.x);
                console.log("x_dist: ", x_dist);
                */
                if(x_dist < 0){
                    this.targetLeft=true;
                    x_dist*=-1;
                }
                //console.log("targetLeft: ", this.targetLeft);
                //compare two entities
                var y_dist=this.target_y - this.middle.y;
                /*
                console.log("target_y: ", this.target_y);
                console.log("source y: ", this.y);
                console.log("y_dist: ", y_dist);
                */
                if(y_dist < 0){
                    this.targetUp=true;
                    y_dist*=-1;
                }
                //console.log("targetUp: ", this.targetUp);
                
                var total_dist=x_dist+y_dist;
                //console.log("total_dist: ", total_dist)
                
                this.x_speed=(x_dist / total_dist)*this.travel_speed;
                //console.log("x_speed: ", this.x_speed);
                this.y_speed=(y_dist/total_dist)*this.travel_speed;
                //console.log("y_speed: ", this.y_speed);
                this.targetAcquired=true;
            }
            
            //console.log("this.x_speed: ", this.x_speed, "-- this.y_speed: ", this.y_speed);
            
            if (this.targetLeft==true)  {this.x-=this.x_speed;}
            else{this.x+=this.x_speed;}
            if (this.targetUp==true){this.y-=this.y_speed;}
            else{this.y+=this.y_speed; }//this.drawSelf(ctx);
        }


        else{

            this.stopped = true;
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-up"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-up-right"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-right"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-down-right"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-down"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-down-left"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-left"));
            this.room.particle_list.push(new Particle(this.x, this.y, 2, 3, "yellow", 20, Math.random()*10, "straight-up-left"));
            this.room.particle_list.push(new Particle(this.x, this.y, 3, 4, this.color, 4, 6));
            //this.room.particle_list.push(new Particle(this.x, this.y, 3, 4, this.color, 4, 8));

            }

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
        if (this.source === 1){
            //alert("source one detected");
        
            for (var i = 0; i < this.room.entity_list.length; i++){
                //console.log("checking collision in for loop..."+i);
                if (testCollision(this.x, this.y, this.width, this.height, this.room.entity_list[i])){
                    this.room.entity_list[i].takeDamage(10);
                    //alert("health of enemy: " + this.room.entity_list[i].health);
                    if (this.room.entity_list[i].health < 0){
                        //alert("killed enemy");
                        this.room.entity_list[i].deleteFromEntityList();
                        
                    }
                    return true;
                } else {
                    //console.log("not colliding");
                }
            }
        }
        
        if (this.source === 2){
            //alert("source one detected");
        
            for (var i = 0; i < this.room.hero_list.length; i++){
                //console.log("checking collision in for loop..."+i);
                if (testCollision(this.x, this.y, this.width, this.height, this.room.hero_list[i])){
                    this.room.hero_list[i].takeDamage(this.damage);
                    if (this.room.hero_list[i].health <= 0){
                        window.location.href="lose.html";
                    }
                    return true;
                } else {
                    //console.log("not colliding");
                }
            }
        }
        

    }
}
