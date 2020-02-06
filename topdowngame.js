

document.addEventListener("DOMContentLoaded", function(event){
    init();
});

function init(){
    //Instantiate the canvas and its context.
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var new_room = new Room(canvas, 12, 30);
    var moving_up;
    var moving_down;
    var moving_left;
    var moving_right;

    var vertical_speed = 0;
    var horizontal_speed = 0;

    //
    document.addEventListener('keydown', function(event){
        if(event.key == "w" || event.key == "W"){
            vertical_speed = -5;
            moving_up = true;
        }

        if(event.key == "d" || event.key == "D"){
            horizontal_speed = 5;
            moving_right = true;
        }

        if(event.key == "a" || event.key == "A"){
            horizontal_speed = -5;
            moving_left = true;
        }

        if(event.key == "s" || event.key == "S"){
            vertical_speed = 5;
            moving_down = true;
        }
    });

    document.addEventListener('keyup', function(event){
        if(event.key == "w" || event.key == "W"){
            moving_up = false;
        }

        if(event.key == "s" || event.key == "S"){
            moving_down = false;
        }

        if(event.key == "d" || event.key == "D"){
            moving_right = false;
        }

        if(event.key == "a" || event.key == "A"){
            moving_left = false;
        }
    });
  
  
    hero = new Entity(50, 50, 50, 50, "purple")
    wall = new Rectangle(500, 300, 20, 350, "blue")
    //start the animations
    setInterval(function() {
        if(moving_down == false && moving_up == false){
            vertical_speed = 0;
        }

        if(moving_left == false && moving_right == false){
            horizontal_speed = 0;
        }
        draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed, new_room);


    }, 10);

}

function draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed, new_room){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    wall.drawSelf(ctx);
    hero.drawSelf(ctx);
    new_room.drawSelf(ctx);
    
    /*collisionType=hero.testCollision(wall);
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
