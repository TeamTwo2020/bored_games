/*testCollision(rectangle){
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
    
}*/

testCollision(x, y, width, heigth, rectangle){
    if ( y > rectangle.bottom || (x+width) < rectangle.left || x > rectangle.right || (y+height) < rectangle.top ){     
        return false;
    }
    return true;
}


