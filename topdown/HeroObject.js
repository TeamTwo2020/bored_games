class Hero1 extends Entity{
    constructor(x, y, width, height, color, room,health,direct){
        super(x, y, width, height, color, room,health);

        this.bullet = null;
        console.log("generate a bullet");
        this.direct=direct;
        this.shot=false;

    }

   generate(ctx){
       //var Entitytemp = new Henry(700, 200, 50, 50, "red", hero, new_room,50);
       this.bullet = new Bullet(this.middle.x, this.middle.y, 5, 5, "navy", henry, this.room);
    }
}


