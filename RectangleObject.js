class Rectangle {
    //create a subclass for entities and add method for movement
    //add getters and setters etc.
    constructor(x, y, width, height, color ){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
    }
    
    get bottom() { return this.y + this.height; }
    get left(){ return this.x; }
    get right(){ return this.x+this.width }
    get top(){ return this.y }
    
    drawSelf(ctx){
        //console.log("called rect draw")
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.closePath();
    }
}
