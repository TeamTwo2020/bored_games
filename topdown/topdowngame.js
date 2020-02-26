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
    hero = new Hero1(canvas, 50, 50, 50, 30, "purple", room_list, room_list.current_room, 30,direct);
    henry = new Henry(700, 200, 50, 50, "red", hero, room_list.array[2][2],10);
    room_list.addEntity(henry, 2, 2);


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

}

function showCoords(event) {
    cursorX=event.pageX-10;
    cursorY=event.pageY-141;
    console.log("cursorX"+(cursorX));
    console.log("cursorY"+(cursorY));
    console.log("hero.middle.x"+hero.middle.x);
    console.log("hero.middle.y"+(hero.middle.y));

}

function draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_list, moving) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = room_list.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onclick = function () {
        console.log("shoot");

        if(hero.bullet!=null) //Continuous shooting
        {
           // hero.bullet.x=0;
            //hero.bullet.y=0;
            hero.bullet=null;
        }
        hero.generate();
        function fire() {

            var x_dist=cursorX-(hero.x+25);
            var y_dist=cursorY-(hero.y+15);
            if(x_dist<0) x_dist=(-1)*x_dist;
            if(y_dist<0) y_dist=(-1)*y_dist;
            var total_dist=x_dist+y_dist;
            var bullet_speed=10;
            if(cursorX>=hero.middle.x)
            {
                if(cursorY>=hero.middle.y) {hero.bullet.x+=(x_dist / total_dist)*bullet_speed;hero.bullet.y+=(y_dist / total_dist)*bullet_speed;}
                else {hero.bullet.x+=(x_dist / total_dist)*bullet_speed;hero.bullet.y-=(y_dist / total_dist)*bullet_speed;}
            }
            if (cursorX<hero.middle.x)
            {
                if(cursorY>=hero.middle.y) {hero.bullet.x-=(x_dist / total_dist)*bullet_speed;hero.bullet.y+=(y_dist / total_dist)*bullet_speed;}
                else {hero.bullet.x-=(x_dist / total_dist)*bullet_speed;hero.bullet.y-=(y_dist / total_dist)*bullet_speed;}
            }


            //  hero.bullet.x-=7.63;
            // hero.bullet.y-=0.37;

            console.log("hero.bullet X"+hero.bullet.x);
            console.log("hero.bullet Y"+hero.bullet.y);
            console.log("cursorX"+(cursorX));
            console.log("cursorY"+(cursorY));



            if(hero.bullet.checkCollisionWithStaticObjects())
            {clearInterval(myVar);
                console.log("meet collision");
                hero.bullet=null;

            }
            else if(hero.bullet.checkCollisionWithPlayerObject()){
                clearInterval(myVar);console.log("shoot successful");
                henry.drawSelfColorShift(ctx,"black");
                hero.bullet=null;

            }

        }

        var myVar = setInterval(fire, 10);//can"t be 5

    }










    hero.outOfBounds();
    hero.drawSelf(ctx);
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

            }
        }
    }


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

