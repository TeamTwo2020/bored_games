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

function testCollision(x, y, width, height, rectangle){
    //console.log("run testcolleision");
    if ( y+5 > rectangle.bottom || (x+width-5) < rectangle.left || x+5 > rectangle.right || (y+height-5) < rectangle.top ){    
        return false;
       // console.log("collision no");
    }
    //console.log("collision yes");
    return true;

}


