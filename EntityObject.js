class Entity extends Rectangle{
    
    constructor(x, y, width, height, color ){
        super(x, y, width, height, color);
    }
    
    testCollision(rectangle){
        if (this.top > rectangle.bottom || this.right < rectangle.left || this.left >rectangle.right || this.bottom < rectangle.top ){
            return false;
        }
        return true;
    }
    
}
