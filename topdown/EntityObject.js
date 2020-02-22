class Entity extends Rectangle{
    
    constructor(x, y, width, height, color, room, health){
        super(x, y, width, height, color);
        this.room = room;
        this.health = health;
        this.damage_animation_timer = 0;
        //console.log("Entity log says room is " + this.room);
        //console.log("Entity log says room id is " + this.room.room_index);
        //health attribute for later
    }

    takeDamage(damage_value){
        this.health -= damage_value;
        this.damage_animation_timer = 8;

    }

    drawSelf(ctx) {
        if (this.damage_animation_timer > 0){
            this.damage_animation_timer -= 1;
            super.drawSelfColorShift(ctx, "red");
        } else {
            super.drawSelf(ctx);
        }
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
