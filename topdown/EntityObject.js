class Entity extends Rectangle {

    constructor(x, y, width, height, color, room, health) {
        super(x, y, width, height, color);
        this.room = room;
        this.health = health;
        this.hostile = false;
        this.damage_animation_timer = 0;

    }


    takeDamage(damage_value) {
        this.health -= damage_value;
        this.damage_animation_timer = 8;
    }
    
    deleteFromEntityList(){
        for (var e = 0; e < this.room.entity_list.length + 1; e++){
            if (this == this.room.entity_list[e]){
                //alert("deleting enemy...");
                this.room.entity_list.splice(e, 1);
                if (this.hostile == true){
                    this.room.room_array.entity_counter -= 1;
                    if (this.room.room_array.entity_counter === 0){
                        alert("YOU WIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIN!");
                    }
                    
                    if (this.room.entity_list.length === 0){
                        this.room.openGates();
                    }
                }
                break;
            }
        }
    }

    drawSelf(ctx) {
        if (this.damage_animation_timer > 0) {
            this.damage_animation_timer -= 1;
            super.drawSelfColorShift(ctx, "red");
        } else {
            super.drawSelf(ctx);
        }
    }

    checkCollisionWithStaticObjects(){
        //console.log("checking collision with static objects: " + this.room.static_object_list.length);

        for (var i = 0; i < this.room.static_object_list.length; i++){
            //console.log("checking collision in for loop..."+i);
            if (testCollision(this.x, this.y, this.width, this.height, this.room.static_object_list[i])){
                return true;
            } else {
                //console.log("not colliding");
            }
        }

        return false;
    }

    checkCollisionWithPlayerObject(){
        if (testCollision(this.x, this.y, this.width, this.height, this.entity)) {
            if(this.entity.health>0)
            { this.entity.takeDamage(10);return true;}
            else alert("game over");

        } else {
            return false;
        }
    }
}
