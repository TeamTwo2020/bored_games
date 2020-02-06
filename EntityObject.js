class Entity extends Rectangle{
    
    constructor(x, y, width, height, colour ){
        super(x);
        super(y);
        super(width);
        super(height);
        super(colour);
    }
    
    get bottom() { return this.y + this.height; }
    get left(){ return this.x; }
    get right(){ return this.x+this.width }
    get top(){ return this.y }
    
    testCollision(rectangle){
        if (this.top > rectangle.bottom || this.right < rectangle.left || this.left >rectangle.right || this.bottom < rectangle.top ){
            return false;
        }
        return true;
    }
    
}
