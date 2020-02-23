class Particle extends Rectangle{

    constructor(x, y, min_size, max_size, color, friction, momentum){
        var size = (Math.random() * max_size) + min_size;
        console.log(color)
        super(x, y, size, size, color);
        this.stopped = false;

        this.x_speed = 0;
        this.y_speed = 0;
        this.x_friction = 0;
        this.y_friction = 0;

        this.x_movement = null;
        this.y_movement = null;

        this.determineMovementSpeeds(momentum);
        this.determineFrictionValues(friction);
        //Determine the movement of the particle


    }

    determineMovementSpeeds(momentum){
        this.y_speed = (Math.round((Math.random() * momentum)));
        console.log("INITIAL Y SPEED: " + this.y_speed);
        this.x_speed = momentum - Math.sqrt(this.y_speed ** 2);
        //console.log("x speed is " + this.x_speed);

        var sign_changer = Math.random();
        console.log("sign changer is " + sign_changer);

        if (sign_changer < 0.25){
            this.y_speed = this.y_speed * -1;
            this.x_speed = this.x_speed * -1;
            console.log("inverted x speed: " + this.x_speed);
            console.log("inverted y speed: " + this.y_speed);
        } else if (sign_changer <0.5){
            this.y_speed = this.y_speed * -1;
            console.log("inverted y speed: " + this.y_speed);
        } else if (sign_changer < 0.75){
            this.x_speed = this.x_speed * -1;
            console.log("inverted x speed: " + this.x_speed);
        }



        if (this.x_speed < 0){
            this.x_movement = "left";
            console.log("x will be moving left");
        } else if (this.x_speed > 0){
            this.x_movement = "right";
            console.log("x will be moving right");
        } else{
            this.x_movement = null;
        }

        if (this.y_speed < 0){
            this.y_movement = "up";
            console.log("y will be moving up");
        } else if (this.y_speed > 0){
            this.y_movement = "down";
            console.log("y will be moving down");
        } else{
            this.y_movement = null;
        }
    }

    determineFrictionValues(friction){
        var total_speed = Math.sqrt(this.x_speed ** 2) + Math.sqrt(this.y_speed ** 2);
        console.log("Yspeed: " + this.y_speed + "   Xspeed: " + this.x_speed + "\ntotal speed is " + total_speed);
        this.x_friction = friction * (10**-2);
        this.y_friction = friction * (10**-2);
        //console.log("proposed friction is " + (friction * (10**-2)));
    }

    moveSelf(){

        if (this.x_speed != null) {
            this.x += this.x_speed;
            console.log("new x speed is: " + this.x_speed);
        }

        if (this.y_speed != null) {
            this.y += this.y_speed;
            console.log("New y speed is: " + this.y_speed);
        }

        //Apply the friction value to the speed depending on which way the player is moving
        if (this.x_movement === "left"){
            this.x_speed = this.x_speed * (1-this.x_friction);
        } else if (this.x_movement === "right"){
            this.x_speed = this.x_speed * (1-this.x_friction);
        }

        if (this.y_movement === "up"){
            this.y_speed = this.y_speed * (1-this.y_friction);
        } else if (this.y_movement === "down"){
            this.y_speed = this.y_speed * (1-this.y_friction);
        }

        //Check if the particle has been slowed to a stop by the friction
        if ((this.x_movement === "left" && this.x_speed > -0.01) || (this.x_movement === "right" && this.x_speed < 0.01) || this.x_speed === 0){
            this.x_movement = null;
            this.x_speed = 0;
            //console.log("no longer moving x");
        }

        if ((this.y_movement === "up" && this.y_speed > -0.01) || (this.y_movement === "down" && this.y_speed < 0.01) || this.y_speed === 0){
            this.y_movement = null;
            this.y_speed = 0;
            //console.log("no longer moving y");
        }

        if (this.x_speed === 0 && this.y_speed === 0){
            //this.stopped = true;
            //console.log("STOPPED at x: " + this.x_speed + " and y is: " + this.y_speed + "\nXPos: " + this.x + "   YPos: " + this.y);
        }


    }

    drawSelf(ctx){
        //console.log("drawing myself at " + this.x + "  " + this.y);
        super.drawSelf(ctx);
    }
}