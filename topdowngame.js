document.addEventListener("DOMContentLoaded", function(event){
    init();
});
var direct=0;// represent forward direction;
var direct2=0;// represent  bullet direction;
function init(){
    //Instantiate the canvas and its context.

    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var new_room = new Room(canvas, 0, 30, "none", "open", "closed", "none");
    var right_room = new Room(canvas, 1, 30, "open", "none", "closed", "closed");
    
    new_room.right_neighbour = right_room;
    right_room.left_neighbour = new_room;
    var room_info = {
        rooms : [],
        current_room: 0
    }
    room_info.rooms.push(new_room);

    room_info.rooms.push(right_room);

    
    console.log("TP: room index is " + new_room.room_index);

    hero = new Hero1(50, 50, 50, 30, "purple",new_room, 30,direct);
    henry = new Henry(700, 200, 50, 50, "red", hero, new_room,50);
    
    room_info.rooms[0].addEntity(henry);

    
    var moving={
        moving_up: false,
        moving_down: false,
        moving_left: false,
        moving_right: false,
        
        moving_up_speed: 0,
        moving_down_speed: 0,
        moving_left_speed: 0,
        moving_right_speed: 0,
        
        colliding_up: false,
        colliding_down: false,
        colliding_left: false,
        colliding_right: false
        
    }

    var vertical_speed = 0;
    var horizontal_speed = 0;
    

    //
    document.addEventListener('keydown', function(event){
        if(event.key == "w" || event.key == "W"){
            moving.moving_up = true;
            moving.moving_up_speed = 5;
            direct=0;
            console.log("up");
        }

        if(event.key == "d" || event.key == "D"){
            moving.moving_right = true;
            moving.moving_right_speed = 5;
            direct=3;
            console.log("right");

        }

        if(event.key == "a" || event.key == "A"){
            moving.moving_left = true;
            moving.moving_left_speed = 5;
            direct=2;
            console.log("left");
        }

        if(event.key == "s" || event.key == "S"){
            moving.moving_down = true;
            moving.moving_down_speed = 5;
            direct=1;
            console.log("down");

        }
    });

    document.addEventListener('keyup', function(event){
        if(event.key == "w" || event.key == "W"){
            moving.moving_up = false;
            moving.moving_up_speed = 0;
        }

        if(event.key == "s" || event.key == "S"){
            moving.moving_down = false;
            moving.moving_down_speed = 0;
        }

        if(event.key == "d" || event.key == "D"){
            moving.moving_right = false;
            moving.moving_right_speed = 0;
        }

        if(event.key == "a" || event.key == "A"){
            moving.moving_left = false;
            moving.moving_left_speed = 0;
        }
    });
  
  
    //wall = new Rectangle(500, 300, 20, 350, "blue")
    
    //start the animations
    var changing=setInterval(myfunction, 10);
    function myfunction()
    {
        if(moving.moving_down == false && moving.moving_up == false){
            vertical_speed = 0;
        }

        if(moving.moving_left == false && moving.moving_right == false){
            horizontal_speed = 0;
        }

        draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_info, moving,changing);




    }

   // if(end==true) {clearInterval(changing);console.log("run clear");}

}

function draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_info, moving) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    //henry.drawSelf(ctx);
    //wall.drawSelf(ctx);
    onclick = function () {
        console.log("shoot");
        if(hero.bullet!=null) //Continuous shooting
        {hero.bullet.x=0;
        hero.bullet.y=0;}

      //  hero.shoot(ctx);
        hero.generate();
       // hero.bullet.x=hero.middle.x;
       // hero.bullet.y=hero.middle.y;
        hero.bullet.drawSelf(ctx);

        function fire() {

            switch (direct2) {
                case 0: hero.bullet.y=  hero.bullet.y-5;break;
                case 1: hero.bullet.y=  hero.bullet.y+5;break;
                case 2: hero.bullet.x=  hero.bullet.x-5;break;
                case 3: hero.bullet.x=  hero.bullet.x+5;

            }
            //hero.bullet.y=  hero.bullet.y+5;
            console.log("bullet.x="+hero.bullet.x);
            console.log("bullet.y="+hero.bullet.y);
            if(hero.bullet.checkCollisionWithStaticObjects())
            {clearInterval(myVar);
                console.log("meet collision");
                hero.bullet.x=0;
                hero.bullet.y=0;
                direct2=direct;
            }
            if(hero.bullet.checkCollisionWithPlayerObject()){
                clearInterval(myVar);console.log("shoot successful");
                henry.drawSelfColorShift(ctx,"black");
                hero.bullet.x=0;
                hero.bullet.y=0;
                direct2=direct;
            }



        }

        var myVar = setInterval(fire, 5);





       // if(hero.bullet.checkCollisionWithStaticObjects()) {f(); console.log("meet collision");}

        hero.bullet.drawSelf(ctx,hero.x, hero.y);


      //  hero.bullet.drawSelf(ctx,hero.bullet.x, hero.bullet.y);
    }

        hero.drawSelf(ctx);
  //  hero.bullet.drawSelf(ctx,hero.bullet.x, hero.bullet.y);

        if (room_info.current_room == 0) {
            if (ii <= 2000) ii += 10;
            else henry.shoot(ctx, hero);// 2seconds for player prepare , after that opponent will shoot
        }
        room_info.rooms[room_info.current_room].drawSelf(ctx);
        //console.log("drawing room: " + room_info.current_room);

        moving.colliding_down = false;
        moving.colliding_up = false;
        moving.colliding_left = false;
        moving.colliding_right = false;

        for (var i = 0; i < room_info.rooms[room_info.current_room].static_object_list.length; i++) {
            if (moving.moving_up_speed > 0) {
                if (testCollision(hero.x, hero.y - 5, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])) {
                    moving.moving_up = false;
                    moving.colliding_up = true;
                    break;


                } else {
                    moving.moving_up = true;

                }
            }
            if (moving.moving_down_speed > 0) {
                if (testCollision(hero.x, hero.y + 5, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])) {
                    moving.moving_down = false;
                    moving.colliding_down = true;
                    break;
                } else {
                    moving.moving_down = true;

                }
            }
            if (moving.moving_left_speed > 0) {
                if (testCollision(hero.x - 5, hero.y, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])) {
                    moving.moving_left = false;
                    moving.colliding_left = true;
                    break;
                } else {
                    moving.moving_left = true;
                    //hero.x = hero.x - moving.moving_left_speed;
                }
            }
            if (moving.moving_right_speed > 0) {
                if (testCollision(hero.x + 5, hero.y, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])) {
                    moving.moving_right = false;
                    moving.colliding_right = true;
                    break;
                } else {
                    moving.moving_right = true;
                    //hero.x=hero.x + moving.moving_right_speed;
                }
            }
        }

        //console.log("r1 o1: " + rooms[0].static_object_list[0].x + " " + rooms[0].static_object_list[0].y + "\nr2 o1: " + rooms[1].static_object_list[0].x + " " + rooms[1].static_object_list[0].y);
        if (moving.colliding_up == false) {


            hero.y = hero.y - moving.moving_up_speed;
        }

        if (moving.colliding_down == false) {
            hero.y = hero.y + moving.moving_down_speed;
        }

        if (moving.colliding_left == false) {
            hero.x = hero.x - moving.moving_left_speed;
        }

        if (moving.colliding_right == false) {
            hero.x = hero.x + moving.moving_right_speed;
        }

        if ((room_info.current_room == 0) && (hero.x + hero.width > canvas.width)) {
            hero.x = room_info.rooms[0].wall_thickness;
            room_info.current_room = 1;
        }

        if ((room_info.current_room == 1) && (hero.x < 0)) {
            hero.x = canvas.width - room_info.rooms[0].wall_thickness - hero.width;
            room_info.current_room = 0;
        }

    }

