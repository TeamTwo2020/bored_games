class Rectangle {
    //create a subclass for entities and add method for movement
    //add getters and setters etc.
    constructor(x, y, width, height, colour ){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=colour;
    }
    
    drawRect(ctx){
        ctx.beginPath();
        ctx.fillStyle=this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
    

}
