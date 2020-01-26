document.addEventListener("DOMContentLoaded", function(event){
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var tile_slot_list = spawnAllTiles(ctx);
    
});

function drawRectangle(ctx){
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(30, 30, 50, 50);
}

function spawnTileSlot(ctx, style, tile_slot, tile_x_pos, tile_y_pos){
    ctx.fillStyle = style;
    tile_slot.drawSelf(ctx, tile_x_pos, tile_y_pos);
}

function spawnAllTiles(ctx){
    var tile_slot_list = [];
    var tile_slot_list_index = 0;
    var spawn_point_x = 10;
    var spawn_point_y = 10;
    for (i = 0; i <10; i++){
        for (j = 0; j < 10; j++){
            tile_slot_list.push(new TileSlot(50, 50));
            spawnTileSlot(ctx, "red", tile_slot_list[tile_slot_list_index], spawn_point_x, spawn_point_y);
            tile_slot_list_index++;
            spawn_point_x += 60;
        }
        spawn_point_x = 10;
        spawn_point_y += 60;
    }
}   
        
        
var basic_tile_slot = {width: 50, height: 50, x: 0, y: 0};


class TileSlot{
    
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    
    announceConstruction(){
        alert("Construction complete");
    }
    
    drawSelf(ctx, x_pos, y_pos){
        ctx.fillRect(x_pos, y_pos, this.width, this.height);
    }
       
}

