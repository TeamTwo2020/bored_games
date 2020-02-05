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
    
    get bottom() { return this.y + this.height; }
    get left(){ return this.x; }
    get right(){ return this.x+this.width }
    get top(){ return this.y }
    
    drawRect(ctx){
        ctx.beginPath();
        ctx.fillStyle=this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
    
    testCollision(rectangle){
        if (this.top > rectangle.bottom || this.right < rectangle.left || this.left >rectangle.right || this.bottom < rectangle.top ){
            return false;
        }
        return true;
    }
}
