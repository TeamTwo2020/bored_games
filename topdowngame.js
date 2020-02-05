

document.addEventListener("DOMContentLoaded", function(event){
    init();
});

function init(){
    //Instantiate the canvas and its context.
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var vertical_speed = 0;
    var horizontal_speed = 0;
    var recorded_event;
    var moving_down;
    var moving_right;
    var moving_left;
    var moving_up;
    
    document.addEventListener('keydown', function(event){
        if(event.key == "w" || event.key == "W"){
            vertical_speed = -5;
            moving_up = true;
        }
    });
    
    document.addEventListener('keydown', function(event){
        
        if(event.key == "d" || event.key == "D"){
            horizontal_speed = 5;
            moving_right = true;
        }
    });
    
    document.addEventListener('keydown', function(event){
        if(event.key == "a" || event.key == "A"){
            horizontal_speed = -5;
            moving_left = true;
        }
    });
    
    document.addEventListener('keydown', function(event){
        
        if(event.key == "s" || event.key == "S"){
            vertical_speed = 5;
            moving_down = true;
        }
    });
        
    vertical_line_list = [];
    vertical_line_list.push(new VerticalGridLine(ctx, 10, -100));
    
    document.addEventListener('keyup', function(event){
        if(event.key == "w" || event.key == "W"){
            moving_up = false;
        }
        
        if(event.key == "s" || event.key == "S"){
            moving_down = false;
        }
        
        if(event.key == "d" || event.key == "D"){
            moving_right = false;
        }
        
        if(event.key == "a" || event.key == "A"){
            moving_left = false;
        }
       
        
                
    });
    hero = new Rectangle(50, 50, 50, 50, "green")
    
    wall = new Rectangle(500, 300, 20, 350, "blue")
    
    //start the animations
    setInterval(function() {
        if(moving_down == false && moving_up == false){
            vertical_speed = 0;
        }
        
        if(moving_left == false && moving_right == false){
            horizontal_speed = 0;
        }
        draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed, vertical_line_list);
        
        
    }, 10);
    
}

function draw(canvas, ctx, hero, wall, vertical_speed, horizontal_speed, vertical_line_list){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "blue";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    
    ctx.fillStyle="purple";
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
    
    if(hero.testCollision(wall)){
        //ctx.fillStyle="orange";
        hero.y =hero.y + (vertical_speed / 2);
        hero.x = hero.x + (horizontal_speed / 2);
        
        
    }else{
        //ctx.fillStyle = "purple";
        hero.y =hero.y + vertical_speed;
        hero.x = hero.x + horizontal_speed;
        
    }
    //hero.drawRect(ctx);
    
    
    
    /*
    for (var i=0; i < vertical_line_list.length; i++){
        console.log("drawing one");
        vertical_line_list[i].drawSelf("black");
    }*/
}

class Rectangle {
    //create a subclass for entities and add method for movement
    //add getters and setters etc.
    constructor(x, y, width, height, colour ){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.colour=colour;
    }
    
    get bottom() { return this.y + this.height; }
    get left() { return this.x }
    get right() {return this.x+this.width }
    get top() { return this.y }
    
    
    drawRect(ctx){
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.colour;
        ctx.closePath();
    }
    
    testCollision(rectangle){
        if ( this.top > rectangle.bottom || this.right < rectangle.left || this.left > rectangle.right || this.bottom < rectangle.top ){
            
            console.log("collision was false");
            return false;
        }
        console.log("collision did run");
        return true;
    }
    
    
}




class VerticalGridLine{
    constructor(ctx, x, y){
        this.x;
        this.y;
        this.ctx = ctx;
        this.height = 3000;
        this.width = 5;
    }
    
    drawSelf(style){
        console.log("drawing myself");
        this.ctx.fillStyle = style;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
        
