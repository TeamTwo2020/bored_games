document.addEventListener('keypress', function(event){
    if(event.keyCode == 87){
        var vertical_speed = 5;
    }
});

document.addEventListener("DOMContentLoaded", function(event){
    var vertical_speed;
    document.addEventListener('keypress', function(event){
    if(event.keyCode == 87){
        vertical_speed = 5;
    }
    });
    init();
});

function init(){
    //Instantiate the canvas and its context.
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var falling_cube = {
        x: 20,
        y: 20
    }
    
    var player = {
        x: 50,
        y: 50
    }
    //start the animations
    setInterval(function() {
        draw(canvas, ctx, falling_cube, player);
    }, 10);
    
}

function draw(canvas, ctx, falling_cube, player){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "purple";
    ctx.fillRect(falling_cube.x, falling_cube.y, 50, 50);
    falling_cube.y += 1;
    
    
    ctx.fillRect(player.x, player.y, 50, 50);
    
    console.log("speed: " + vertical_speed);
    
}
