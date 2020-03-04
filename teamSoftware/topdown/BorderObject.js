//Forms one of the four borders around the canvas
class Border{
    constructor(x, y, width, height, color, gate_status){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.gate_status = gate_status;
        this.gate_color = "black";
        this.gate_length = 80;
        this.first_block;
        this.second_block;
        this.third_block;
        
        this.generateWallBlockPositions();
        
    }
    
    //during construction, the border object must discover the positions of the wall chunks
    generateWallBlockPositions(){
        if (this.gate_status == "locked"){
            this.gate_color = "red";
        } else if (this.gate_status == "open"){
            this.gate_color = "#01a88c";
        } else if (this.gate_status == "none"){
            this.gate_color = this.color;
        } else if (this.gate_status == "closed"){
            this.gate_color = this.color;
        }
            // excellent solution!
        if (this.width < this.height){

            //Draw the first block of the wall
            this.first_block = new Rectangle(this.x, this.y, this.width, (this.height/2)-40, this.color);
            
            //Draw the gate part of the wall
            this.second_block = new Rectangle(this.x, this.first_block.height, this.width, this.gate_length, this.gate_color);
            
            //Draw the other wall on the other side of the gate
            this.third_block = new Rectangle(this.x, this.first_block.height + this.second_block.height, this.width, (this.height/2)-40, this.color);
        }
        
        else {
            //Draw the first block of the wall
            this.first_block = new Rectangle(this.x, this.y, (this.width/2)-(20 + this.height), this.height, this.color);

            
            //Draw the second block of the wall
            this.second_block = new Rectangle(this.x + this.first_block.width, this.y, this.gate_length, this.height, this.gate_color);
           
            //Draw the third block of the wall
            this.third_block = new Rectangle(this.x + this.first_block.width + this.second_block.width, this.y, (this.width/2)-(20 + this.height), this.height, this.color);
            
            
        }
               
    }
    
    //Draw the border by drawing its blocks
    drawSelf(ctx){
        this.first_block.drawSelf(ctx);
        this.second_block.drawSelf(ctx);
        this.third_block.drawSelf(ctx);
    }
    
}
