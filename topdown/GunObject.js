class Gun {
    constructor(entity, room, gun_type){
        this.entity=entity; //the target
        this.room=room;
        this.gun_type=gun_type;
        this.shot_timer = 0;    //shot timer will be set by the gun type methods -- if shot_timer>0 dont reset it
    }

    //rifle - mid-low fire rate, mid travel time, mid damage
    //smg - high fire rate, mid travel time, low damage
    //sniper - v slow rate of fire, fast travel time, high damage
    //shotgun - mid-low fire rate, slow travel time, high damage -- 3 projectiles
    //two way gun, 4 way gun
    //big boss - smg, but in a spiral

    get rifle(){
        var rifle={
            width: 5,
            height: 5,
            travel_time: 8,
            damage: 8,
            timer: 40,
            color: "navy"
        }
        return rifle;
    }

    get smg(){
        var smg={
            width: 5,
            height: 5,
            travel_time: 8,
            damage: 4,
            timer: 20,
            color: "lime"
        }
        return smg;
    }

    get sniper(){
        var sniper={
            width: 5,
            height: 5,
            travel_time: 15,
            damage: 15,
            timer: 100,
            color: "brown"
        }
        return sniper;
    }

    get shotgun(){
        var shotgun={
            width: 5,
            height: 5,
            travel_time: 4,
            damage: 15,
            timer: 40,
            color: "red"
        }
        return shotgun;
    }

    get two_way(){
        var two_way={
            width: 5,
            height: 5,
            travel_time: 8,
            damage: 8,
            timer: 40,
            color: "navy"
        }
        return two_way;
    }


    shootGun(x, y){
        if (this.gun_type == 1){    //rifle
            this.rifleFire(x, y);
        }else if(this.gun_type==2){ //smg
            this.smgFire(x, y);
        }else if(this.gun_type==3){ //sniper
            this.sniperFire(x, y);
        }else if(this.gun_type==4){ //shotgun
            this.shotgunFire(x, y);
        }else if(this.gun_type==5){ //two way
            this.twoWayFire(x, y);
        }
    }

    //Create a new object? for each gun type
    rifleFire(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.rifle.width, this.rifle.height, this.rifle.travel_time, this.rifle.damage, this.rifle.color, this.entity, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = this.rifle.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    smgFire(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.smg.width, this.smg.height, this.smg.travel_time, this.smg.damage, this.smg.color, this.entity, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = this.smg.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    sniperFire(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.sniper.width, this.sniper.height, this.sniper.travel_time, this.sniper.damage, this.sniper.color, this.entity, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = this.sniper.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    shotgunFire(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.shotgun.width, this.shotgun.height, this.shotgun.travel_time, this.shotgun.damage, this.shotgun.color, this.entity, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = this.shotgun.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    twoWayFire(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.two_way.width, this.two_way.height, this.two_way.travel_time, this.two_way.damage, this.two_way.color, this.entity, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = this.two_way.timer;
        } else {
            this.shot_timer -= 1;
        }
    }
}