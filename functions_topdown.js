
testCollision(rectangle){
    if (checkInitialCollision(rectangle)){
        return 0;
    }else if (checkTop(rectangle)){
        return 1;
    }else if (checkBottom(rectangle)){
        return 2;
    }else if (checkLeft(rectangle)){
        return 3;
    }else if (checkRight(rectangle)){
        return 4;
    }
}


checkInitialCollision(rectangle){
     if ( this.top > rectangle.bottom || this.right < rectangle.left || this.left > rectangle.right || this.bottom < rectangle.top ){        
        return false;
    }
    return true;
}

checkTop(rectangle){
    if (this.top==rectangle.bottom && ( ( hero.right > wall.left && hero.right<wall.right) || ( hero.left>wall.left && hero.left<wall.right) || ( hero.left<wall.left && hero.right>wall.right) ) ){
        return true;
    }
    return false;
}

checkBottom(rectangle){
    if( this.bottom==rectangle.top && ( ( hero.right > wall.left && hero.right<wall.right) || ( hero.left>wall.left && hero.left<wall.right) || ( hero.left<wall.left && hero.right>wall.right) ) ){
        return true;
    }
    return false;
}

checkLeft(rectangle){
    if( this.left == rectangle.right && ( ( hero.top < wall.bottom  && hero.top > wall.top) || ( hero.bottom < wall.bottom && hero.bottom> wall.top ) || ( hero.top<wall.top && hero.bottom > wall.bottom )  ) ){
        return true;
    }
    return false;
}

checkRight(rectangle){
    if( this.right == rectangle.left && ( ( hero.top < wall.bottom  && hero.top > wall.top) || ( hero.bottom < wall.bottom && hero.bottom> wall.top ) || ( hero.top<wall.top && hero.bottom > wall.bottom )  ) ){
        return true;
    }
    return false;
}
