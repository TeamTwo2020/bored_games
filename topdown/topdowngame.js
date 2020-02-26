document.addEventListener("DOMContentLoaded", function(event){
    init();
});
var direct=0;// represent forward direction;
var direct2=0;// represent  bullet direction;
var cursorX=0;
var cursorY=0;
function init(){
    //Instantiate the canvas and its context.
    var room_color = "#01a88c";
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    room_list = new RoomArray(canvas, room_color);

    console.log("TD: " + canvas.width);
    hero = new Hero1(canvas, 50, 50, 50, 30, "purple", room_list, room_list.current_room, 30,direct);
    henry = new Henry(700, 200, 50, 50, "red", hero, room_list.current_room,50);
    room_list.addEntity(henry, 2, 2);
    console.log("INITIAL INSTANTIAION\n+++++++++++++++++++++\nSpawn room row: " + room_list.current_room.room_row_index + "  col: " + room_list.current_room.room_row_index + "\nHenry claims to be in row: " + henry.room.room_row_index + "  col: " + henry.room.room_col_index + "\nThe spawnroom claims that there is " + room_list.array[2][2].entity_list.length + " entities in it\nHero claims to be in row: " + hero.room.room_row_index + "  col: " + hero.room.room_col_index);
    
    


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
        
    };
    var vertical_speed = 0;
    var horizontal_speed = 0;
    document.addEventListener('keydown', function(event){
        if(event.key == "w" || event.key == "W"){
            moving.moving_up = true;
            moving.moving_up_speed = 5;
            direct=0;
            //console.log("up");
        }

        if(event.key == "d" || event.key == "D"){
            moving.moving_right = true;
            moving.moving_right_speed = 5;
            direct=3;
            //console.log("right");

        }

        if(event.key == "a" || event.key == "A"){
            moving.moving_left = true;
            moving.moving_left_speed = 5;
            direct=2;
            //console.log("left");
        }

        if(event.key == "s" || event.key == "S"){
            moving.moving_down = true;
            moving.moving_down_speed = 5;
            direct=1;
            //console.log("down");

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

    var changing=setInterval(myfunction, 10);
    function myfunction()
    {
        if(moving.moving_down == false && moving.moving_up == false){
            vertical_speed = 0;
        }

        if(moving.moving_left == false && moving.moving_right == false){
            horizontal_speed = 0;
        }

        draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_list, moving,changing);




    }

   // if(end==true) {clearInterval(changing);console.log("run clear");}

}

function showCoords(event) {
   cursorX = event.screenX;
   cursorY = event.screenY-210;

    //console.log("screenX"+cursorX2);
}

function draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_list, moving) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = room_list.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    //henry.drawSelf(ctx);
    //wall.drawSelf(ctx);
    onclick = function () {
        console.log("shoot");
        showCoords(event);
       // console.log("xxxx"+cursorX);

        console.log("xxxx"+(cursorX));
        console.log("heroX"+(hero.x+25));
        console.log("YYYYY"+(cursorY));

        console.log("heroY"+(hero.y+15));

        if(hero.bullet!=null) //Continuous shooting
        {hero.bullet.x=0;
         hero.bullet.y=0;}

    
        hero.generate();
       // hero.bullet.x=hero.middle.x;
       // hero.bullet.y=hero.middle.y;
        hero.bullet.drawSelf(ctx);

        function fire() {
            var x_dist=cursorX-(hero.x+25);
            var y_dist=cursorY-(hero.y+15);
            if(x_dist<0) x_dist=(-1)*x_dist;
            if(y_dist<0) y_dist=(-1)*y_dist;
            var total_dist=x_dist+y_dist;

            var bullet_speed=8;


            if(cursorX>=hero.x)
            {
                if(cursorY>=hero.y) {hero.bullet.x+=(x_dist / total_dist)*bullet_speed;hero.bullet.y+=(y_dist / total_dist)*bullet_speed;}
                else {hero.bullet.x+=(x_dist / total_dist)*bullet_speed;hero.bullet.y-=(y_dist / total_dist)*bullet_speed;}
            }
            if (cursorX<hero.x)
            {
                if(cursorY>=hero.y) {hero.bullet.x-=(x_dist / total_dist)*bullet_speed;hero.bullet.y+=(y_dist / total_dist)*bullet_speed;}
                else {hero.bullet.x-=(x_dist / total_dist)*bullet_speed;hero.bullet.y-=(y_dist / total_dist)*bullet_speed;}
            }

            console.log("hero.bullet XX"+hero.bullet.x);
            console.log("hero.bullet YY"+hero.bullet.y);

           /* switch (direct2) {
                case 0: hero.bullet.y=  hero.bullet.y-5;break;
                case 1: hero.bullet.y=  hero.bullet.y+5;break;
                case 2: hero.bullet.x=  hero.bullet.x-5;break;
                case 3: hero.bullet.x=  hero.bullet.x+5;

            }

            */


            //hero.bullet.y=  hero.bullet.y+5;
            //console.log("bullet.x="+hero.bullet.x);
            //console.log("bullet.y="+hero.bullet.y);
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
              direct2=direct;


        }

        var myVar = setInterval(fire, 5);





       // if(hero.bullet.checkCollisionWithStaticObjects()) {f(); console.log("meet collision");}

        hero.bullet.drawSelf(ctx,hero.x, hero.y);


      //  hero.bullet.drawSelf(ctx,hero.bullet.x, hero.bullet.y);
    }
        //console.log("ECHING BOUNDS");
        hero.outOfBounds();
        //console.log("BOUNDS checked");
        hero.drawSelf(ctx);
  //  hero.bullet.drawSelf(ctx,hero.bullet.x, hero.bullet.y);

        if (room_list.current_room.room_row_index == henry.room.room_row_index && room_list.current_room.room_col_index == henry.room.room_col_index) {
            if (ii <= 2000) ii += 10;
            else henry.shoot();// 2seconds for player prepare , after that opponent will shoot
        }
        room_list.current_room.drawSelf(ctx);
        //console.log("drawing room: " + room_info.current_room);

        moving.colliding_down = false;
        moving.colliding_up = false;
        moving.colliding_left = false;
        moving.colliding_right = false;

        for (var i = 0; i < room_list.current_room.static_object_list.length; i++) {
            if (moving.moving_up_speed > 0) {
                if (testCollision(hero.x, hero.y - 5, hero.width, hero.height, room_list.current_room.static_object_list[i])) {
                    moving.moving_up = false;
                    moving.colliding_up = true;

                } else {
                    moving.moving_up = true;

                }
            }
            if (moving.moving_down_speed > 0) {
                if (testCollision(hero.x, hero.y + 5, hero.width, hero.height, room_list.current_room.static_object_list[i])) {
                    moving.moving_down = false;
                    moving.colliding_down = true;

                } else {
                    moving.moving_down = true;

                }
            }
            if (moving.moving_left_speed > 0) {
                if (testCollision(hero.x - 5, hero.y, hero.width, hero.height, room_list.current_room.static_object_list[i])) {
                    moving.moving_left = false;
                    moving.colliding_left = true;

                } else {
                    moving.moving_left = true;
                    //hero.x = hero.x - moving.moving_left_speed;
                }
            }
            if (moving.moving_right_speed > 0) {
                if (testCollision(hero.x + 5, hero.y, hero.width, hero.height, room_list.current_room.static_object_list[i])) {
                    moving.moving_right = false;
                    moving.colliding_right = true;

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

    }

