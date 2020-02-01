

document.addEventListener("DOMContentLoaded", function(event){
    init();
});

function init(){
    //Instantiate the canvas and its context.
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var vertical_speed = 0;
    var recorded_event;
    
    recorded_event = document.addEventListener('keydown', function(event){
        if(event.keyCode == 87){
            vertical_speed = 5;
            return event;
        }
        
        if(event.keyCode == 68){
        
        }
        
        if(event.keyCode == 65){
            
        }
        
        if(event.keyCode == 83){
            vertical_speed = -5;
            return event;
        }
        
        console.log("key event is " + event.keyCode);
        
    });
    
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
        draw(canvas, ctx, falling_cube, player, vertical_speed);
        
        
    }, 10);
    
}

function draw(canvas, ctx, falling_cube, player, vertical_speed){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "purple";
    ctx.fillRect(falling_cube.x, falling_cube.y, 50, 50);
    falling_cube.y =falling_cube.y + vertical_speed;
    //falling_cube.x += 1;
    
    
    ctx.fillRect(player.x, player.y, 50, 50);
    
    console.log("speed: " + vertical_speed);
    //vertical_speed = 0;
}
