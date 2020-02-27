class Gun {
    constructor(x, y, entity, room, gun_type){
        this.entity=entity; //the target
        this.x=x;
        this.y=y;
        this.room=room;
        this.gun_type=gun_type;
        this.shot_timer = 0;    //shot timer will be set by the gun type methods -- if shot_timer>0 dont reset it
    }
}