class Gun {
    constructor(room, gun_type, source){
        this.room=room;
        this.gun_type=gun_type;
        this.source=source;
        this.shot_timer = 100;    //shot timer will be set by the gun type methods -- if shot_timer>0 dont reset it
        this.boss_color_value=0; //increment to 999 then reset to 0
        this.boss_attributes={
            color_value: 0,
            gun1: 1,
            gun1_x: -30,
            gun1_up_set: false,
            gun1_down_set: true,
            gun1_y: -30,
            gun1_right_set: true,
            gun1_left_set: true,

            gun2: 2,
            gun2_x: 30,
            gun2_up_set: true,
            gun2_down_set: true,
            gun2_y: -30,
            gun2_right_set: false,
            gun2_left_set: true,

            gun3: 3,
            gun3_x: 30,
            gun3_up_set: true,
            gun3_down_set: false,
            gun3_y: 30,
            gun3_right_set: true,
            gun3_left_set: true,

            gun4: 4,
            gun4_x: -30,
            gun4_up_set: true,
            gun4_down_set: true,
            gun4_y: 30,
            gun4_right_set: true,
            gun4_left_set: false
        }
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

    get sprinkler(){
        var sprinkler={
            width: 5,
            height: 5,
            travel_time: 8,
            damage: 3,
            timer: 2,
            color: ["#ff0000", "#ff4000", "#ff8000", "#ffbf00", "#ffff00", "#bfff00", "#80ff00", "#40ff00", "#00ff00", "#00ff40", "#00ff80", "#00ffbf", "#00ffff", "#00bfff", "#0080ff", "#0040ff", "#0000ff", "#4000ff", "#8000ff", "#bf00ff", "#ff00ff", "#ff00bf", "#ff0080", "#ff0066", "#ff0040", "#ff0000"]
        }
        return sprinkler;
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
                this.sprinklerFire(target_x, target_y, x, y);
            }
        }
    }

    playerFire(target_x, target_y, x_spawn, y_spawn){
        //console.log("target_x: ", target_x, " -- target_y: ", target_y);
        //console.log*("x_spawn: ", x_spawn, " -- y_spawn: ", y_spawn);
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
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.shotgun.width, this.shotgun.height, this.shotgun.travel_time, this.shotgun.damage, this.shotgun.color, target_x, target_y, 2, this.room));
            //console.log("last projectile", this.room.projectile_object_list[this.room.projectile_object_list.length-1])
            //this.room.printProjectile();
            var pellet0=this.room.projectile_object_list[this.room.projectile_object_list.length-3];
            //console.log(pellet0);
            if (pellet0.x_speed<0){
                pellet0.x_speed*=-2;
            }
            if (pellet0.y_speed<0){
                pellet0.y_speed*=-2;
            }

            var pellet1={
                dest_x: target_x,
                dest_y: target_y
            };
            var pellet2={
                dest_x: target_x,
                dest_y: target_y
            };

            //if the hero is left then the x_speed will be less than half of negative total speed
            if (pellet0.x_speed > (this.shotgun.travel_time / 2)){
                pellet1.dest_y+=200;
                pellet2.dest_y-=200;
            }else{
                pellet1.dest_x+=200;
                pellet2.dest_x-=200;
            }

            //use pellet0's x_speed and y_speed to check whether veritcal or horizontal
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.shotgun.width, this.shotgun.height, this.shotgun.travel_time, this.shotgun.damage, this.shotgun.color, pellet1.dest_x, pellet1.dest_y, 2, this.room));
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.shotgun.width, this.shotgun.height, this.shotgun.travel_time, this.shotgun.damage, this.shotgun.color, pellet2.dest_x, pellet2.dest_y, 2, this.room));

            this.shot_timer += this.shotgun.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    sprinklerFire(target_x, target_y, x_spawn, y_spawn){
        if (this.shot_timer==0){
            //give bullet the coords of hero here, so its only passed once

            //add the offset here to be added to x_spawn & y_spawn

            this.setBossGuns();

            var bullet_color=this.bossColor();

            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.sprinkler.width, this.sprinkler.height, this.sprinkler.travel_time, this.sprinkler.damage, bullet_color, x_spawn+this.boss_attributes.gun1_x, y_spawn+this.boss_attributes.gun1_y, 2, this.room));
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.sprinkler.width, this.sprinkler.height, this.sprinkler.travel_time, this.sprinkler.damage, bullet_color, x_spawn+this.boss_attributes.gun2_x, y_spawn+this.boss_attributes.gun2_y, 2, this.room));
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.sprinkler.width, this.sprinkler.height, this.sprinkler.travel_time, this.sprinkler.damage, bullet_color, x_spawn+this.boss_attributes.gun3_x, y_spawn+this.boss_attributes.gun3_y, 2, this.room));
            this.room.addProjectile(new Bullet(x_spawn, y_spawn, this.sprinkler.width, this.sprinkler.height, this.sprinkler.travel_time, this.sprinkler.damage, bullet_color, x_spawn+this.boss_attributes.gun4_x, y_spawn+this.boss_attributes.gun4_y, 2, this.room));

            this.shot_timer += this.sprinkler.timer;
        } else {
            this.shot_timer -= 1;
        }
    }

    setBossGuns(){

        this.setVertical(this.boss_attributes.gun1);
        this.setHorizontal(this.boss_attributes.gun1);

        this.setVertical(this.boss_attributes.gun2);
        this.setHorizontal(this.boss_attributes.gun2);

        this.setVertical(this.boss_attributes.gun3);
        this.setHorizontal(this.boss_attributes.gun3);

        this.setVertical(this.boss_attributes.gun4);
        this.setHorizontal(this.boss_attributes.gun4);

        this.moveAim(this.boss_attributes.gun1);
        this.moveAim(this.boss_attributes.gun2);
        this.moveAim(this.boss_attributes.gun3);
        this.moveAim(this.boss_attributes.gun4);
    }

    setVertical(gun_num){
        if (gun_num==1){
            if (this.boss_attributes.gun1_x>30){
                console.log("Gun 1 set top right");
                this.boss_attributes.gun1_x=30;
                this.boss_attributes.gun1_up_set=true;
                this.boss_attributes.gun1_right_set=false;
            }else if (this.boss_attributes.gun1_x<-30){
                console.log("Gun 1 set bottom left");
                this.boss_attributes.gun1_x=-30;
                this.boss_attributes.gun1_down_set=true;
                this.boss_attributes.gun1_left_set=false;
            }
        }else if(gun_num==2){
            if (this.boss_attributes.gun2_x>30){
                console.log("Gun 2 set top right");
                this.boss_attributes.gun2_x=30;
                this.boss_attributes.gun2_up_set=true;
                this.boss_attributes.gun2_right_set=false;
            }else if (this.boss_attributes.gun2_x<-30){
                console.log("Gun 2 set bottom left");
                this.boss_attributes.gun2_x=-30;
                this.boss_attributes.gun2_down_set=true;
                this.boss_attributes.gun2_left_set=false;
            }
        }else if(gun_num==3){
            if (this.boss_attributes.gun3_x>30){
                console.log("Gun 3 set top right");
                this.boss_attributes.gun3_x=30;
                this.boss_attributes.gun3_up_set=true;
                this.boss_attributes.gun3_right_set=false;
            }else if (this.boss_attributes.gun3_x<-30){
                console.log("Gun 3 set bottom left");
                this.boss_attributes.gun3_x=-30;
                this.boss_attributes.gun3_down_set=true;
                this.boss_attributes.gun3_left_set=false;
            }
        }else if(gun_num==4){
            if (this.boss_attributes.gun4_x>30){
                console.log("Gun 4 set top right");
                this.boss_attributes.gun4_x=30;
                this.boss_attributes.gun4_up_set=true;
                this.boss_attributes.gun4_right_set=false;
            }else if (this.boss_attributes.gun4_x<-30){
                console.log("Gun 4 set bottom left");
                this.boss_attributes.gun4_x=-30;
                this.boss_attributes.gun4_down_set=true;
                this.boss_attributes.gun4_left_set=false;
            }
        }
    }

    setHorizontal(gun_num){
        if (gun_num==1){
            if (this.boss_attributes.gun1_y>30){
                console.log("Gun 1 set bottom right");
                this.boss_attributes.gun1_y=30;
                this.boss_attributes.gun1_right_set=true;
                this.boss_attributes.gun1_down_set=false;
            }else if (this.boss_attributes.gun1_y<-30){
                console.log("Gun 1 set top left");
                this.boss_attributes.gun1_y=-30;
                this.boss_attributes.gun1_left_set=true;
                this.boss_attributes.gun1_up_set=false;
            }
        }else if(gun_num==2){
            if (this.boss_attributes.gun2_y>30){
                console.log("Gun 2 set bottom right");
                this.boss_attributes.gun2_y=30;
                this.boss_attributes.gun2_right_set=true;
                this.boss_attributes.gun2_down_set=false;
            }else if (this.boss_attributes.gun2_y<-30){
                console.log("Gun 2 set top left");
                this.boss_attributes.gun2_y=-30;
                this.boss_attributes.gun2_left_set=true;
                this.boss_attributes.gun2_up_set=false;
            }
        }else if(gun_num==3){
            if (this.boss_attributes.gun3_y>30){
                console.log("Gun 3 set bottom right");
                this.boss_attributes.gun3_y=30;
                this.boss_attributes.gun3_right_set=true;
                this.boss_attributes.gun3_down_set=false;
            }else if (this.boss_attributes.gun3_y<-30){
                console.log("Gun 3 set top left");
                this.boss_attributes.gun3_y=-30;
                this.boss_attributes.gun3_left_set=true;
                this.boss_attributes.gun3_up_set=false;
            }
        }else if(gun_num==4){
            if (this.boss_attributes.gun4_y>30){
                console.log("Gun 4 set bottom right");
                this.boss_attributes.gun4_y=30;
                this.boss_attributes.gun4_right_set=true;
                this.boss_attributes.gun4_down_set=false;
            }else if (this.boss_attributes.gun4_y<-30){
                console.log("Gun 4 set top left");
                this.boss_attributes.gun4_y=-30;
                this.boss_attributes.gun4_left_set=true;
                this.boss_attributes.gun4_up_set=false;
            }
        }
    }

    moveAim(gun_num){
        if (gun_num==1){
            if (!this.boss_attributes.gun1_up_set){
                this.boss_attributes.gun1_x+=1;
            }else if (!this.boss_attributes.gun1_right_set){
                this.boss_attributes.gun1_y+=1;
            }else if (!this.boss_attributes.gun1_down_set){
                this.boss_attributes.gun1_x-=1;
            }else if (!this.boss_attributes.gun1_left_set){
                this.boss_attributes.gun1_y-=1;
            }
        }else if (gun_num==2){
            if (!this.boss_attributes.gun2_up_set){
                this.boss_attributes.gun2_x+=1;
            }else if (!this.boss_attributes.gun2_right_set){
                this.boss_attributes.gun2_y+=1;
            }else if (!this.boss_attributes.gun2_down_set){
                this.boss_attributes.gun2_x-=1;
            }else if (!this.boss_attributes.gun2_left_set){
                this.boss_attributes.gun2_y-=1;
            }
        }else if (gun_num==3){
            if (!this.boss_attributes.gun3_up_set){
                this.boss_attributes.gun3_x+=1;
            }else if (!this.boss_attributes.gun3_right_set){
                this.boss_attributes.gun3_y+=1;
            }else if (!this.boss_attributes.gun3_down_set){
                this.boss_attributes.gun3_x-=1;
            }else if (!this.boss_attributes.gun3_left_set){
                this.boss_attributes.gun3_y-=1;
            }
        }else if (gun_num==4){
            if (!this.boss_attributes.gun4_up_set){
                this.boss_attributes.gun4_x+=1;
            }else if (!this.boss_attributes.gun4_right_set){
                this.boss_attributes.gun4_y+=1;
            }else if (!this.boss_attributes.gun4_down_set){
                this.boss_attributes.gun4_x-=1;
            }else if (!this.boss_attributes.gun4_left_set){
                this.boss_attributes.gun4_y-=1;
            }
        }
    }

    bossColor(){
        var bullet_color=this.sprinkler.color[this.boss_attributes.color_value];
        this.boss_attributes.color_value+=1;
        if (this.boss_attributes.color_value==this.sprinkler.color.length){
            this.boss_attributes.color_value=0;
        }
        return bullet_color;
    }
}
