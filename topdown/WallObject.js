class Wall{
    constructor(x, y, preset_wall, color){
        this.x = x;
        this.y = y;
        this.width;
        this.height;
      //  this.spawn_padding_width = 150;  my comment
       // this.spawn_padding_height = 150;  my comment
        this.wall_blocks= [];
        this.color = color;

        
        this.block_thickness = 35;
        this.populateWallBlocks(preset_wall);
    }
    
    populateWallBlocks(preset_wall){
        this.wall_blocks.push(new Rectangle(this.x, this.y, this.block_thickness, this.block_thickness, this.color));
        
        switch(preset_wall){
            case 0:
                for (var i = 1; i < 5; i++){
                    this.wall_blocks.push(new Rectangle(this.wall_blocks[i-1].x+this.block_thickness, this.y, this.block_thickness, this.block_thickness, this.color));
                }
                
                break;
            
            case 1:
                for (var i = 1; i < 5; i++){
                    this.wall_blocks.push(new Rectangle(this.x,this.wall_blocks[i-1].y+this.block_thickness,  this.block_thickness, this.block_thickness, this.color));
                }
                
                //this.width = this.
                //console.log("case 1");
                break;
                
            case 2:
                for (var i = 1; i < 5; i++){
                    this.wall_blocks.push(new Rectangle(this.wall_blocks[i-1].x+this.block_thickness,this.wall_blocks[i-1].y+this.block_thickness,  this.block_thickness, this.block_thickness, this.color));
                }
                //console.log("case 2");
                break;
                
            case 3:
                for (var i = 1; i < 5; i++){
                    this.wall_blocks.push(new Rectangle(this.wall_blocks[i-1].x-this.block_thickness,this.wall_blocks[i-1].y-this.block_thickness,  this.block_thickness, this.block_thickness, this.color));
                }
                //console.log("case 3");
                break;
                
            case 4:
                //console.log("case 4");
                break;
                
            case 5:
                //console.log("case 5");
                break;
            }
            
            this.width = this.block_thickness;
            var furthest_right_block = this.wall_blocks[0];
            var furthest_down_block = this.wall_blocks[0];
            this.height = this.block_thickness;
            for (var j = 0; j < this.wall_blocks.length; j++){
                if (this.wall_blocks[j].x > this.width){
                    furthest_right_block = this.wall_blocks[j];
                }
                
                if (this.wall_blocks[j].y > this.height){
                    furthest_down_block = this.wall_blocks[j];
                }
            }
            
            this.height = (furthest_down_block.y + this.block_thickness) - this.wall_blocks[0].y;
            this.width = (furthest_right_block.x + this.block_thickness) - this.wall_blocks[0].x;
            
            console.log("height is: " + this.height);
            console.log("width is: " + this.width);
            
            
            
    }
    
    
    drawSelf(ctx){
        //console.log("number of blocks: " + this.wall_blocks.length);
        for (var i = 0; i < this.wall_blocks.length; i++){
            //console.log("Wb index: " + i + "wall blocks length: " + this.wall_blocks.length);
            this.wall_blocks[i].drawSelf(ctx);
            
        }
        
    }
            
    
}
