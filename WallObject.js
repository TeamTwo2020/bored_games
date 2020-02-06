class Wall{
    construct(x, y, preset_wall, color){
        this.x = x;
        this.y = y;
        this.spawn_padding_width = 300;
        this.spawn_padding_height = 300;
        this.wall_blocks = [];
        this.color = color;
        
        this.block_thickness = 35;
        this.populateWallBlocks(preset_wall);
    }
    
    populateWallBlocks(preset_wall){
        if(preset_wall == 0){
            console.log("preset is " + preset);
            for (i = 0; i < 5; i++){
                if (this.wall_blocks.length == 0){
                    this.wall_blocks.push(new Rectangle(this.x, this.y, this.block_thickness, this.block_thickness, this.color));
                } else {
                    this.wall_blocks.push(new Rectangle(this.wall_blocks[i].x, this.y, this.block_thickness, this.block_thickness, this.color));
                }
            }
        }
    }
    
    drawSelf(ctx){
    
    }
            
    
}
