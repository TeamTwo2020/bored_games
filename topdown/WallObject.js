class Wall{
    constructor(x, y, preset_wall, color){
        this.x = x;
        this.y = y;
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
                //console.log("case 0");
                break;
            
            case 1:
                for (var i = 1; i < 5; i++){
                    this.wall_blocks.push(new Rectangle(this.x,this.wall_blocks[i-1].y+this.block_thickness,  this.block_thickness, this.block_thickness, this.color));
                }
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
            
    }
    
    
    drawSelf(ctx){
        //console.log("number of blocks: " + this.wall_blocks.length);
        for (var i = 0; i < this.wall_blocks.length; i++){
            //console.log("Wb index: " + i + "wall blocks length: " + this.wall_blocks.length);
            this.wall_blocks[i].drawSelf(ctx);
            
        }
        
    }
            
    
}
