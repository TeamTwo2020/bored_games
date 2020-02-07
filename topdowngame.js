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
    
    var rooms = [];
    var current_room = 0;
    rooms.push(new_room);
    rooms.push(right_room);
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
  
  
    hero = new Entity(50, 50, 50, 50, "purple")
    //wall = new Rectangle(500, 300, 20, 350, "blue")
    henry = new Henry(700, 200, 50, 50, "red", hero)
    
    //start the animations
    setInterval(function() {
        if(moving.moving_down == false && moving.moving_up == false){
            vertical_speed = 0;
        }

        if(moving.moving_left == false && moving.moving_right == false){
            horizontal_speed = 0;
        }
        draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, rooms, current_room, moving);


    }, 10);

}

function draw(canvas, ctx, hero, henry, vertical_speed, horizontal_speed, rooms, current_room, moving){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    henry.drawSelf(ctx);
    //wall.drawSelf(ctx);
    hero.drawSelf(ctx);
    henry.shoot(ctx, hero);
    rooms[current_room].drawSelf(ctx);
    
    moving.colliding_down = false;
    moving.colliding_up = false;
    moving.colliding_left = false;
    moving.colliding_right = false;
    
    for (var i = 0; i < rooms[current_room].static_object_list.length; i++){
            if(moving.moving_up_speed > 0){
                if(testCollision(hero.x, hero.y-5, hero.width, hero.height, rooms[current_room].static_object_list[i])){
                    moving.moving_up=false;
                    moving.colliding_up = true;
                    break;
                    
                    
                }else{
                    moving.moving_up=true;
                    
                    //hero.y = hero.y - moving.moving_up_speed;
                }
            }
            if(moving.moving_down_speed > 0){
                if(testCollision(hero.x, hero.y+5, hero.width, hero.height, rooms[current_room].static_object_list[i])){
                    moving.moving_down=false;
                    moving.colliding_down = true;
                    break;
                }else{
                    moving.moving_down=true;
                    //hero.y = hero.y + moving.moving_down_speed;
                }
            }
            if(moving.moving_left_speed > 0){
                if(testCollision(hero.x-5, hero.y, hero.width, hero.height, rooms[current_room].static_object_list[i])){
                    moving.moving_left=false;
                    moving.colliding_left = true;
                    break;
                }else{
                    moving.moving_left=true;
                    //hero.x = hero.x - moving.moving_left_speed;
                }
            }
            if(moving.moving_right_speed > 0){
                if(testCollision(hero.x+5, hero.y, hero.width, hero.height, rooms[current_room].static_object_list[i])){
                    moving.moving_right=false;
                    moving.colliding_right = true;
                    break;
                }else{
                    moving.moving_right=true;
                    //hero.x=hero.x + moving.moving_right_speed;
                }
            }
    }
    
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
