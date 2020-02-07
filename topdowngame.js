document.addEventListener("DOMContentLoaded", function(event){
    init();
});

function init(){
    //Instantiate the canvas and its context.
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var new_room = new Room(canvas, 12, 30);
    var moving={
        moving_up: false,
        moving_down: false,
        moving_left: false,
        moving_right: false,
        
        moving_up_speed: 0,
        moving_down_speed: 0,
        moving_left_speed: 0,
        moving_right_speed: 0
        
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
    wall = new Rectangle(500, 300, 20, 350, "blue")
    //start the animations
    setInterval(function() {
        if(moving.moving_down == false && moving.moving_up == false){
            vertical_speed = 0;
        }

        if(moving.moving_left == false && moving.moving_right == false){
            horizontal_speed = 0;
        }
        draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed, new_room, moving);


    }, 10);

}

function draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed, new_room, moving){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    wall.drawSelf(ctx);
    hero.drawSelf(ctx);
    new_room.drawSelf(ctx);
    
    //IF moving_up is true, call testCollision with future coords and wall. 
    if(moving.moving_up_speed > 0){
        if(testCollision(hero.x, hero.y-5, hero.width, hero.height, wall)){
            moving.moving_up=false;
            
        }else{
            moving.moving_up=true;
            hero.y = hero.y - moving.moving_up_speed;
        }
    }
    if(moving.moving_down_speed > 0){
        if(testCollision(hero.x, hero.y+5, hero.width, hero.height, wall)){
            moving.moving_down=false;
        }else{
            moving.moving_down=true;
            hero.y = hero.y + moving.moving_down_speed;
        }
    }
    if(moving.moving_left_speed > 0){
        if(testCollision(hero.x-5, hero.y, hero.width, hero.height, wall)){
            moving.moving_left=false;
        }else{
            moving.moving_left=true;
            hero.x = hero.x - moving.moving_left_speed;
        }
    }
    if(moving.moving_right_speed > 0){
        if(testCollision(hero.x+5, hero.y, hero.width, hero.height, wall)){
            moving.moving_right=false;
        }else{
            moving.moving_right=true;
            hero.x=hero.x + moving.moving_right_speed;
        }
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
