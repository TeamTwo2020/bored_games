document.addEventListener("DOMContentLoaded", function(event){
    //Instantiate the canvas and its context.
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //Spawn in the one-hundred tile slots and associate them
    //with their neighbours.
    var tile_slot_list = spawnAllTiles(ctx);
    associateNeighbours(tile_slot_list);
    
    //Spawn in the letter inventory for the player
    letter_inventory = new LetterInventory();
    letter_inventory.drawSelf(ctx, 335, 780);
    
    //A debugging function so that tile slots highlight themselves and their
    //neighbours when they are clicked
    canvas.addEventListener('mousedown', function(e) {
        clicked_tile_slot = tileSlotClicked(canvas, e, tile_slot_list);
        if (clicked_tile_slot!= null){
            clicked_tile_slot.drawSelf(ctx, clicked_tile_slot.x, clicked_tile_slot.y, "blue")
            clicked_tile_slot.highlightNeighbours(ctx);
        }
    });
});

//Draw a tile slot at this location with this colour
function spawnTileSlot(ctx, style, tile_slot, tile_x_pos, tile_y_pos){
    ctx.fillStyle = style;
    tile_slot.drawSelf(ctx, tile_x_pos, tile_y_pos);
}

//Spawn in all of the tile slots and return a list of them
function spawnAllTiles(ctx){
    var tile_slot_list = [];
    var tile_slot_list_index = 0;
    var spawn_point_x = 335;
    var spawn_point_y = 10;
    for (i = 0; i <15; i++){
        for (j = 0; j < 15; j++){
            tile_slot_list.push(new TileSlot(45, 45));
            spawnTileSlot(ctx, "red", tile_slot_list[tile_slot_list_index], spawn_point_x, spawn_point_y);
            tile_slot_list[tile_slot_list_index].x = spawn_point_x;
            tile_slot_list[tile_slot_list_index].y = spawn_point_y;
            tile_slot_list[tile_slot_list_index].colour = "red";
            tile_slot_list[tile_slot_list_index].list_pos = tile_slot_list_index;
            tile_slot_list_index++;
            spawn_point_x += 50;
        }
        spawn_point_x = 335;
        spawn_point_y += 50;
    }
    
    return tile_slot_list;
}

//A function which does something when a tile slot is clicked. Used for
//debugging.
function tileSlotClicked(canvas, event, tile_slot_list){
    var canvas_border = canvas.getBoundingClientRect();
    var y = event.clientY - canvas_border.top;
    var x = event.clientX - canvas_border.left;
    
    for (i = 0; i < tile_slot_list.length; i ++){
        if (x >= tile_slot_list[i].x && x <= (tile_slot_list[i].x + tile_slot_list[i].width)  && y >= tile_slot_list[i].y && y <= (tile_slot_list[i].y + tile_slot_list[i].height)){
            return tile_slot_list[i];
            break;
        }
        
    }
    
    return null;
}

//This associates all tiles with the tiles above, below and to the sides.
function associateNeighbours(tile_slot_list){
    for (i = 0; i < tile_slot_list.length; i ++){
        if (i > 10){
            tile_slot_list[i].top_neighbour = tile_slot_list[(i-11)];
        }
        
        if (i % 11 != 0){
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

//Print the cursor position.
function getCursorPosition(canvas, event){
    var rectangle = canvas.getBoundingClientRect();
    var x = event.clientX - rectangle.left;
    var y = event.clientY - rectangle.top;
    console.log("x: " + x + "y: " + y);
}

//This holds the letters that the player is allowed to use.
class LetterInventory{
    constructor(){
        this.letters = [];
        this.width = 500;
        this.height = 60;
    }
    
    drawSelf(ctx, x, y){
        ctx.fillStyle = "lime";
        ctx.fillRect(x, y, this.width, this.height);
    }
}

//This is the tile slot class.
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

