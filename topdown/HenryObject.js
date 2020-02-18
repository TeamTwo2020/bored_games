class Henry extends Entity{
    constructor(x, y, width, height, color, entity, room){
        super(x, y, width, height, color, room);
        this.shot=false;
        this.entity=entity;
        //console.log("Henry room is : " + room.returnIndex());
        this.bullet = null;
        //this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "gold", this.entity, this.room);
        this.canshoot = true;
    }
    
    shoot(ctx){
        if (this.shot==false){
            //give bullet the coords of hero here, so its only passed once
            this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "navy", this.entity, this.room);
            this.shot=true;
        }
        this.shot=this.bullet.moveBullet(ctx, this.shot);
        
    }
    
}


