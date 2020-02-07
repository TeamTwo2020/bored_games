class Entity extends Rectangle{
    
    constructor(x, y, width, height, color ){
        super(x, y, width, height, color);
        //health attribute for later
    }
    
    get middle() { 
        var middle={
            x: this.x+(this.width/2),
            y: this.y+(this.height/2)
        }
        return middle; 
    }
    /*
    testCollision(rectangle){
        if (this.top > rectangle.bottom || this.right < rectangle.left || this.left >rectangle.right || this.bottom < rectangle.top ){
            return false;
        }
        return true;
    }*/
    /*
    testCollision(rectangle){
        if (this.checkInitialCollision(rectangle)){
            return 0;
        }else if (this.checkTop(rectangle)){
            return 1;
        }else if (this.checkBottom(rectangle)){
            return 2;
        }else if (this.checkLeft(rectangle)){
            return 3;
        }else if (this.checkRight(rectangle)){
            return 4;
        }
        
    }

    checkInitialCollision(rectangle){
        if ( this.top > rectangle.bottom || this.right < rectangle.left || this.left > rectangle.right || this.bottom < rectangle.top ){     
            return true;
        }
        return false;
    }

    checkTop(rectangle){
        if (this.top<=rectangle.bottom && ( ( hero.right > wall.left && hero.right<wall.right) || ( hero.left>wall.left && hero.left<wall.right) || ( hero.left<wall.left && hero.right>wall.right) ) ){
            console.log("top");
            return true;
        }
        return false;
    }

    checkBottom(rectangle){
        if( this.bottom>=rectangle.top && ( ( hero.right > wall.left && hero.right<wall.right) || ( hero.left>wall.left && hero.left<wall.right) || ( hero.left<wall.left && hero.right>wall.right) ) ){
            console.log("bottom");
            return true;
        }
        return false;
    }

    checkLeft(rectangle){
        if( this.left <= rectangle.right && ( ( hero.top < wall.bottom  && hero.top > wall.top) || ( hero.bottom < wall.bottom && hero.bottom> wall.top ) || ( hero.top<wall.top && hero.bottom > wall.bottom )  ) ){
            console.log("left");
            return true;
        }
        return false;
    }

    checkRight(rectangle){
        if( this.right >= rectangle.left && ( ( hero.top < wall.bottom  && hero.top > wall.top) || ( hero.bottom < wall.bottom && hero.bottom> wall.top ) || ( hero.top<wall.top && hero.bottom > wall.bottom )  ) ){
            console.log("right");
            return true;
        }
        return false;
    }*/

    
}
