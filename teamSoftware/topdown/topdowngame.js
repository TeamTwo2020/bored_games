document.addEventListener("DOMContentLoaded", function(event){
    init();
});
var direct=0;// represent forward direction;
var direct2=0;// represent  bullet direction;
var cursorX=0;
var cursorY=0;
var new_x = Math.random() * 200+650;
var new_y = Math.random() * 200+ 35;
var new_x1 = Math.random() * 200+35;
var new_y1 = Math.random() * 200+ 350;
var randomnum = Math.random() * 2;
var numofHealthpack=0;
function init(){
    //Instantiate the canvas and its context.
    var room_color = "#01a88c";
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    room_list = new RoomArray(canvas, room_color);
    hero = new Hero(canvas, 50, 50, 50, 30, "purple", room_list, room_list.current_room, 60, direct);
    room_list.beginGeneratingRooms(canvas, 10, room_list.current_room, hero);
    room_list.current_room.hero_list = [hero];
    henry = new Henry(700, 200, 50, 50, "red", hero, room_list.current_room, 50, 2);
    //room_list.generateEnemies(hero);
    //console.log("INITIAL INSTANTIAION\n+++++++++++++++++++++\nSpawn room row: " + room_list.current_room.room_row_index + "  col: " + room_list.current_room.room_row_index + "\nHenry claims to be in row: " + henry.room.room_row_index + "  col: " + henry.room.room_col_index + "\nThe spawnroom claims that there is " + room_list.array[2][2].entity_list.length + " entities in it\nHero claims to be in row: " + hero.room.room_row_index + "  col: " + hero.room.room_col_index);
    
    


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
        }

        if(event.key == "d" || event.key == "D"){
            moving.moving_right = true;
            moving.moving_right_speed = 5;
            direct=3;
        }

        if(event.key == "a" || event.key == "A"){
            moving.moving_left = true;
            moving.moving_left_speed = 5;
            direct=2;
        }

        if(event.key == "s" || event.key == "S"){
            moving.moving_down = true;
            moving.moving_down_speed = 5;
            direct=1;
        }
    });

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        hero.shoot(x, y);

    }

    const check_canvas = document.querySelector('canvas');
    canvas.addEventListener('mousedown', function(e){
        getCursorPosition(canvas, e);
    })
//Movement
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



function draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_list, moving) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = room_list.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     var situation=0;
     if (hero.health<=10)  {

             generateHealthPack(ctx,situation,room_list.current_room);
     }




    hero.outOfBounds();
    hero.drawSelf(ctx);
    if (room_list.current_room.room_row_index == henry.room.room_row_index && room_list.current_room.room_col_index == henry.room.room_col_index) {
        if (ii <= 2000) ii += 10;
      // 2seconds for player prepare , after that opponent will shoot
    }
    room_list.current_room.drawSelf(ctx);
   

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

