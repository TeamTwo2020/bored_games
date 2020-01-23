document.addEventListener("DOMContentLoaded", function(event){
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    alert("Function executed");
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var tile1 = 
    
});

function drawRectangle(ctx){
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(30, 30, 50, 50);
}

function spawnTileSlot(ctx, tile_slot, tile_x, tile_y){
    ctx.fillStyle = "green";
    ctx.fillRect(tile_x, tile_y, tile_slot.x, tile_slot.y);
}

var tile_slot = {width: 50, height: 50, x: 0, y: 0};
