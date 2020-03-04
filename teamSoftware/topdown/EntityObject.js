//An entity is an object that can move around, and has its own health value. Both enemies and the hero count as an entity.
class Entity extends Rectangle {

    constructor(x, y, width, height, color, room, health) {
        super(x, y, width, height, color);
        //Which room the entity is in
        this.room = room;
        this.health = health;
        //Whether or not the entity is hostile to the player.
        this.hostile = false;
        this.damage_animation_timer = 0;

    }

    //Reduces the entity's health, triggering a color-shift animation as well.
    takeDamage(damage_value) {
        this.health -= damage_value;
        this.damage_animation_timer = 8;
    }
    
    //If the entity is destroyed, it will be removed from the entity list of its room.
    deleteFromEntityList(){
        for (var e = 0; e < this.room.entity_list.length + 1; e++){
            if (this == this.room.entity_list[e]){
                this.room.entity_list.splice(e, 1);
                if (this.hostile == true){
                    //If it was a hostile entity, that's one less entity the player has to kill.
                    this.room.room_array.entity_counter -= 1;
                    //If it is the last hostile entity to die, the win condition is triggered
                    if (this.room.room_array.entity_counter === 0){
                        window.location.href="firework.html";
                    }
                    
                    //If it is the last hostile entity in the room, the gates will open
                    if (this.room.entity_list.length === 0){
                        this.room.openGates();
                    }
                }
                break;
            }
        }
    }
    
    //Draw the entity. If it took damage recently, it will temporarily have a new colour.
    drawSelf(ctx) {
        if (this.damage_animation_timer > 0) {
            this.damage_animation_timer -= 1;
            super.drawSelfColorShift(ctx, "red");
        } else {
            super.drawSelf(ctx);
        }
    }
    
    //Check if the entity is colliding with a static object in the room.
    checkCollisionWithStaticObjects(){
        for (var i = 0; i < this.room.static_object_list.length; i++){
            if (testCollision(this.x, this.y, this.width, this.height, this.room.static_object_list[i])) {
                return true;
            }
        }

        return false;
    }
    
    //Check if the entity is colliding with one of the border walls
    checkCollisionWithBorderObjects(){

        var check_upper = testCollision(this.x, this.y, this.width, this.height, this.room.upper_wall);
        var check_lower = testCollision(this.x, this.y, this.width, this.height, this.room.lower_wall);
        var check_left = testCollision(this.x, this.y, this.width, this.height, this.room.left_wall);
        var check_right = testCollision(this.x, this.y, this.width, this.height, this.room.right_wall);

        if (check_upper || check_lower || check_left || check_right){
            return true;
        }
        return false;
    }
    
    //Check if the entity is colliding with the player.
    checkCollisionWithPlayerObject(player){
        if (testCollision(this.x, this.y, this.width, this.height, player)) {
            return true;

        } else {
            return false;
        }
    }
}
