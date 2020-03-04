//This class is used for pretty much everything you see in screen. Its sole purpose is for providing drawing functionality.
class Rectangle {
    constructor(x, y, width, height, color ){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
    }
    
    //Get the middle of the rectangle
    get middle() { 
        var middle={
            x: this.x+(this.width/2),
            y: this.y+(this.height/2)
        }
        return middle; 
    }
    
    //Get the different sides of the rectangle
    get bottom() { return this.y + this.height; }
    get left(){ return this.x; }
    get right(){ return this.x+this.width }
    get top(){ return this.y }
    
    //Draw a rectangle
    drawSelf(ctx){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
    }

    //Currently used only for entities that have been damaged
    drawSelfColorShift(ctx, temp_color){
        ctx.beginPath();

        ctx.fillStyle = temp_color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle=this.color;

    }
}
