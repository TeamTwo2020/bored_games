class Henry extends Entity{
    constructor(x, y, width, height, color, entity){
        super(x, y, width, height, color);
        this.shot=false;
        this.entity=entity;
        this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "gold", this.entity);
    }
    
    shoot(ctx){
        if (this.shot==false){
            //give bullet the coords of hero here, so its only passed once
            this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "navy", this.entity);
            this.shot=true;
        }
        this.shot=this.bullet.moveBullet(ctx, this.shot);
        
    }
    
}


