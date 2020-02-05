

document.addEventListener("DOMContentLoaded", function(event){
    init();
});

function init(){
    //Instantiate the canvas and its context.
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var new_room = new RoomObject(12);
    var moving_up;
    var moving_down;
    var moving_left;
    var moving_right;

    var vertical_speed = 0;
    var horizontal_speed = 0;
	  console.log("new_room: " + new_room.number);

    heroSetUp();
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


    hero = new Rectangle(50, 50, 50, 50, "purple")

    wall = new Rectangle(500, 300, 20, 350, "orange")

    //start the animations
    setInterval(function() {
        if(moving_down == false && moving_up == false){
            vertical_speed = 0;
        }

        if(moving_left == false && moving_right == false){
            horizontal_speed = 0;
        }
        draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed);


    }, 10);

}

function draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "purple";
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
    hero.y =hero.y + vertical_speed;
    hero.x = hero.x + horizontal_speed;


    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    console.log("hero x:" + hero.x + "hero y: " + hero.y);
    //console.log("vertical speed: " + vertical_speed);
    /*
    for (var i=0; i < vertical_line_list.length; i++){
        console.log("drawing one");
        vertical_line_list[i].drawSelf("black");
    }*/
}
