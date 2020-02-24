class Henry extends Entity{
    constructor(x, y, width, height, color, entity, room,health){
        super(x, y, width, height, color, room,health);
        this.shot=false;
        this.entity=entity;
        this.room = room;
        console.log("room index in henry: " + this.room.room_index);
        //console.log("Henry room is : " + room.returnIndex());
        //this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "gold", this.entity, this.room);
        this.canshoot = true;
        this.shot_timer = 70;
    }
    
    shoot(ctx){
        //console.log("making a bullet, adding it to projectile list");
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(this.middle.x, this.middle.y, 5, 5, "navy", this.entity, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = 70;
        } else {
            this.shot_timer -= 1;
        }
        
        
    }
}


