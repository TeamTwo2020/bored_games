document.addEventListener("DOMContentLoaded", function(event){
    init();
});

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
    
    console.log("TP: room index is " + new_room.returnIndex());
    hero = new Entity(50, 50, 50, 50, "purple", new_room);
    henry = new Henry(700, 200, 50, 50, "red", hero, new_room);
    
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
        }

        if(event.key == "d" || event.key == "D"){
            moving.moving_right = true;
            moving.moving_right_speed = 5;
        }

        if(event.key == "a" || event.key == "A"){
            moving.moving_left = true;
            moving.moving_left_speed = 5;
        }

        if(event.key == "s" || event.key == "S"){
            moving.moving_down = true;
            moving.moving_down_speed = 5;
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
    setInterval(function() {
        if(moving.moving_down == false && moving.moving_up == false){
            vertical_speed = 0;
        }

        if(moving.moving_left == false && moving.moving_right == false){
            horizontal_speed = 0;
        }
        draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_info, moving);


    }, 10);

}

function draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, room_info, moving){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //henry.drawSelf(ctx);
    //wall.drawSelf(ctx);
    hero.drawSelf(ctx);
    
    if (room_info.current_room == 0){
        henry.shoot(ctx, hero);
    }
    room_info.rooms[room_info.current_room].drawSelf(ctx);
    //console.log("drawing room: " + room_info.current_room);
    
    moving.colliding_down = false;
    moving.colliding_up = false;
    moving.colliding_left = false;
    moving.colliding_right = false;
    
    for (var i = 0; i < room_info.rooms[room_info.current_room].static_object_list.length; i++){
            if(moving.moving_up_speed > 0){
                if(testCollision(hero.x, hero.y-5, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])){
                    moving.moving_up=false;
                    moving.colliding_up = true;

                    
                }else{
                    moving.moving_up=true;
                    
                    //hero.y = hero.y - moving.moving_up_speed;
                }
            }
            if(moving.moving_down_speed > 0){
                if(testCollision(hero.x, hero.y+5, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])){
                    moving.moving_down=false;
                    moving.colliding_down = true;

                }else{
                    moving.moving_down=true;
                    //hero.y = hero.y + moving.moving_down_speed;
                }
            }
            if(moving.moving_left_speed > 0){
                if(testCollision(hero.x-5, hero.y, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])){
                    moving.moving_left=false;
                    moving.colliding_left = true;

                }else{
                    moving.moving_left=true;
                    //hero.x = hero.x - moving.moving_left_speed;
                }
            }
            if(moving.moving_right_speed > 0){
                if(testCollision(hero.x+5, hero.y, hero.width, hero.height, room_info.rooms[room_info.current_room].static_object_list[i])){
                    moving.moving_right=false;
                    moving.colliding_right = true;
                   
                }else{
                    moving.moving_right=true;
                    //hero.x=hero.x + moving.moving_right_speed;
                }
            }
    }
    
    //console.log("r1 o1: " + rooms[0].static_object_list[0].x + " " + rooms[0].static_object_list[0].y + "\nr2 o1: " + rooms[1].static_object_list[0].x + " " + rooms[1].static_object_list[0].y);
    if(moving.colliding_up == false){
        hero.y = hero.y - moving.moving_up_speed;
    }
    
    if(moving.colliding_down == false){
        hero.y = hero.y + moving.moving_down_speed;
    }
    
    if(moving.colliding_left == false){
        hero.x = hero.x - moving.moving_left_speed;
    }
    
    if (moving.colliding_right == false){
        hero.x=hero.x + moving.moving_right_speed;
    }
    
    if ((room_info.current_room == 0) && (hero.x+hero.width > canvas.width)){
        hero.x = room_info.rooms[0].wall_thickness;
        room_info.current_room = 1;
    }
    
    if ((room_info.current_room == 1) && (hero.x < 0)){
        hero.x = canvas.width - room_info.rooms[0].wall_thickness - hero.width;
        room_info.current_room = 0;
    }
    
    
        
    //console.log("right speed: " + moving.moving_right_speed);
    
    /*
    collisionType=hero.testCollision(wall);
    switch(collisionType){
        case 0:
            hero.y =hero.y + vertical_speed;
            hero.x = hero.x + horizontal_speed;
            break;
        case 1: //cant go up
            hero.y=hero.y + (vertical_speed / 2);
            hero.x = hero.x + (horizontal_speed / 2);
            break;
        case 2://cant go down
            hero.y=hero.y + (vertical_speed / 2);
            hero.x = hero.x + (horizontal_speed / 2);
            
            break;
        case 3://cant go left
            hero.y=hero.y + (vertical_speed / 2);
            hero.x = hero.x + (horizontal_speed / 2);
            
            break;
        case 4: //cant go right
            hero.y=hero.y + (vertical_speed / 2);
            hero.x = hero.x + (horizontal_speed / 2);
        
            break;
        
    }*/
    
    /*
    if(hero.testCollision(wall)){
        hero.y =hero.y + (vertical_speed / 2);
        hero.x = hero.x + (horizontal_speed / 2);

    }else{
        hero.y =hero.y + vertical_speed;
        hero.x = hero.x + horizontal_speed;

    }*/
    //hero.drawRect(ctx);



    /*
    for (var i=0; i < vertical_line_list.length; i++){
        console.log("drawing one");
        vertical_line_list[i].drawSelf("black");
    }*/
}
