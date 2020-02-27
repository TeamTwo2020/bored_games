class Gun {
    constructor(room, gun_type, source){
        this.room=room;
        this.gun_type=gun_type;
        this.source=source;
        this.shot_timer = 100;    //shot timer will be set by the gun type methods -- if shot_timer>0 dont reset it
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


    shootGun(target_x, target_y, x, y){
        if (this.source==1){
            this.playerFire(target_x, target_y, x, y);
        }else{
            if (this.gun_type == 1){    //rifle
                this.rifleFire(target_x, target_y, x, y);
            }else if(this.gun_type==2){ //smg
                this.smgFire(target_x, target_y, x, y);
            }else if(this.gun_type==3){ //sniper
                this.sniperFire(target_x, target_y, x, y);
            }else if(this.gun_type==4){ //shotgun
                this.shotgunFire(target_x, target_y, x, y);
            }else if(this.gun_type==5){ //two way
                this.twoWayFire(target_x, target_y, x, y);
            }
        }
    }

    playerFire(target_x, target_y, x_spawn, y_spawn){
        this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.rifle.width, this.rifle.height, this.rifle.travel_time, this.rifle.damage, this.rifle.color, target_x, target_y, 1, this.room));
    }

    //Create a new object? for each gun type
    rifleFire(target_x, target_y, x_spawn, y_spawn){
        if (this.shot_timer==0){
            //OK --- It fires, it's off and also the bullets dont get drawn in rooms
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.rifle.width, this.rifle.height, this.rifle.travel_time, this.rifle.damage, this.rifle.color, target_x, target_y, 2, this.room));

            this.shot_timer += this.rifle.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    smgFire(target_x, target_y, x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.smg.width, this.smg.height, this.smg.travel_time, this.smg.damage, this.smg.color, target_x, target_y, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer += this.smg.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    sniperFire(target_x, target_y, x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.sniper.width, this.sniper.height, this.sniper.travel_time, this.sniper.damage, this.sniper.color, target_x, target_y, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer += this.sniper.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    shotgunFire(target_x, target_y, x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.shotgun.width, this.shotgun.height, this.shotgun.travel_time, this.shotgun.damage, this.shotgun.color, target_x, target_y, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer += this.shotgun.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    twoWayFire(target_x, target_y, x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.two_way.width, this.two_way.height, this.two_way.travel_time, this.two_way.damage, this.two_way.color, target_x, target_y, 2, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer += this.two_way.timer;
        } else {
            this.shot_timer -= 1;
        }
    }
}
