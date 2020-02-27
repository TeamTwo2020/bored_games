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

    get rifle_gun(){
        var rifle={
            width: 5,
            height: 5,
            travel_time: 8,
            damage: 8
        }
        return rifle;
    }


    shootGun(x, y){
        if (this.gun_type == 1){    //rifle
            this.rifle(x, y);
        }else if(this.gun_type==2){ //smg
            this.smg(x, y);
        }else if(this.gun_type==3){ //sniper
            this.sniper(x, y);
        }else if(this.gun_type==4){ //shotgun
            this.shotgun(x, y);
        }else if(this.gun_type==5){ //two way
            this.twoWay(x, y);
        }
    }

    //Create a new object? for each gun type
    rifle(x_spawn, y_spawn){
        var rifle={

        }
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, 5, 5, 8, 8, "navy", this.entity, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = 40;
        } else {
            this.shot_timer -= 1;
        }
    }

    smg(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, 5, 5, "lime", this.entity, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = 10;
        } else {
            this.shot_timer -= 1;
        }
    }

    sniper(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, 5, 5, "navy", this.entity, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = 40;
        } else {
            this.shot_timer -= 1;
        }
    }

    shotgun(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, 5, 5, "navy", this.entity, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = 40;
        } else {
            this.shot_timer -= 1;
        }
    }

    twoWay(x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, 5, 5, "navy", this.entity, this.room));
            //console.log("room index in henry shoot " + this.room.room_index);
            this.shot_timer = 40;
        } else {
            this.shot_timer -= 1;
        }
    }
}