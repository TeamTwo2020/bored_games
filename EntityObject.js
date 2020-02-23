class Entity extends Rectangle {

    constructor(x, y, width, height, color, room, health) {
        super(x, y, width, height, color);
        this.room = room;
        this.health = health;
        this.damage_animation_timer = 0;

    }


    takeDamage(damage_value) {
        this.health -= damage_value;
        this.damage_animation_timer = 8;

    }

    drawSelf(ctx) {
        if (this.damage_animation_timer > 0) {
            this.damage_animation_timer -= 1;
            super.drawSelfColorShift(ctx, "red");
        } else {
            super.drawSelf(ctx);
        }
    }
}
