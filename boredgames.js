document.addEventListener("DOMContentLoaded", function(event){
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var tile_slot_list = spawnAllTiles(ctx);
    associateNeighbours(tile_slot_list);
    canvas.addEventListener('mousedown', function(e) {
        clicked_tile_slot = tileSlotClicked(canvas, e, tile_slot_list);
        if (clicked_tile_slot== null){
            console.log("No tile slot clicked");
        }
        
        else{
            console.log('tile slot clicked');
            clicked_tile_slot.drawSelf(ctx, clicked_tile_slot.x, clicked_tile_slot.y, "blue")
            clicked_tile_slot.highlightNeighbours(ctx);
        }
    });
    console.log("done waiting m8");
    
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
            tile_slot_list[tile_slot_list_index].x = spawn_point_x;
            tile_slot_list[tile_slot_list_index].y = spawn_point_y;
            tile_slot_list[tile_slot_list_index].colour = "red";
            tile_slot_list[tile_slot_list_index].list_pos = tile_slot_list_index;
            tile_slot_list_index++;
            spawn_point_x += 60;
        }
        spawn_point_x = 10;
        spawn_point_y += 60;
    }
    
    return tile_slot_list;
}

function tileSlotClicked(canvas, event, tile_slot_list){
    var canvas_border = canvas.getBoundingClientRect();
    var y = event.clientY - canvas_border.top;
    var x = event.clientX - canvas_border.left;
    
    for (i = 0; i < tile_slot_list.length; i ++){
        if (x >= tile_slot_list[i].x && x <= (tile_slot_list[i].x + tile_slot_list[i].width)  && y >= tile_slot_list[i].y && y <= (tile_slot_list[i].y + tile_slot_list[i].height)){
            console.log("list pos: " + tile_slot_list[i].list_pos);
            return tile_slot_list[i];
            break;
        }
        
    }
    
    return null;
}
function associateNeighbours(tile_slot_list){
    for (i = 0; i < tile_slot_list.length; i ++){
        if (i > 9){
            tile_slot_list[i].top_neighbour = tile_slot_list[(i-10)];
        }
        
        if (i % 10 != 0){
            tile_slot_list[i].left_neighbour = tile_slot_list[(i-1)];
        }
        
        if (i != 9 && i != 19 && i != 29 && i != 39 && i != 49 && i != 59 && i != 69 && i != 79 && i != 89 && i != 99){
            tile_slot_list[i].right_neighbour = tile_slot_list[(i+1)];
        }
        
        if (i < 90){
            tile_slot_list[i].bottom_neighbour = tile_slot_list[(i+10)];
        }
    }
}

function getCursorPosition(canvas, event){
    var rectangle = canvas.getBoundingClientRect();
    var x = event.clientX - rectangle.left;
    var y = event.clientY - rectangle.top;
    console.log("x: " + x + "y: " + y);
}
        
        
var basic_tile_slot = {width: 50, height: 50, x: 0, y: 0};


class TileSlot{
    
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.list_pos;
        this.top_neighbour;
        this.bottom_neighbour;
        this.left_neighbour;
        this.right_neighbour;
        this.colour;
        this.x;
        this.y;
    }
    
    announceConstruction(){
        alert("Construction complete");
    }
    
    drawSelf(ctx, x_pos, y_pos){
        ctx.fillRect(x_pos, y_pos, this.width, this.height);
    }
        
    drawSelf(ctx, x_pos, y_pos, style){
        ctx.fillStyle = style;
        ctx.fillRect(x_pos, y_pos, this.width, this.height);
        this.colour = style;
    }
    
    highlightNeighbours(ctx){
        if (this.top_neighbour != null){
            this.top_neighbour.reColourSelf(ctx, "orange");
        }
        
        if (this.left_neighbour != null){
            this.left_neighbour.reColourSelf(ctx, "orange");
        }
        
        if (this.right_neighbour != null){
            this.right_neighbour.reColourSelf(ctx, "orange");
        }
        
        if (this.bottom_neighbour != null){
            this.bottom_neighbour.reColourSelf(ctx, "orange");
        }
    }
    
    reColourSelf(ctx, style){
        ctx.fillStyle = style;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.colour = style;
    }
}

