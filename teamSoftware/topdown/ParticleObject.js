//Particles are superficial effects to make the game look prettier.
class Particle extends Rectangle{
    //They take in a momentum value, which denotes the speed of the particle, and a friction value which determines how fast it will slow down.
    constructor(x, y, min_size, max_size, color, friction, momentum, direction){
        var size = (Math.random() * max_size) + min_size;
        super(x, y, size, size, color);
        this.stopped = false;

        this.x_speed = 0;
        this.y_speed = 0;
        this.x_friction = 0;
        this.y_friction = 0;

        this.x_movement = null;
        this.y_movement = null;

        this.determineMovementSpeeds(momentum, direction);
        this.determineFrictionValues(friction);

        this.direction = direction;
        //Determine the movement of the particle


    }


    //Determine where the particle will move. If it is not given, it will be random.
    determineMovementSpeeds(momentum, direction){

        if (direction === "straight-up"){
            this.y_speed = momentum * -1;
            this.x_speed = 0;
        } else if (direction === "straight-up-right"){
            this.y_speed = (momentum/2) * -1;
            this.x_speed = momentum/2;
        } else if (direction === "straight-right") {
            this.y_speed = 0;
            this.x_speed = momentum;
        } else if (direction === "straight-down-right"){
            this.y_speed = momentum/2;
            this.x_speed = momentum/2;
        } else if (direction === "straight-down"){
            this.y_speed = momentum;
            this.x_speed = 0;
        } else if ( direction === "straight-down-left"){
            this.y_speed = momentum/2;
            this.x_speed = (momentum/2) * -1;
        } else if (direction === "straight-left"){
            this.y_speed = 0;
            this.x_speed = momentum * -1;
        } else if (direction === "straight-up-left"){
            this.y_speed = (momentum/2) * -1;
            this.x_speed = (momentum/2) * -1;
        }

        else {
            this.y_speed = (Math.round((Math.random() * momentum)));
            //console.log("INITIAL Y SPEED: " + this.y_speed);
            this.x_speed = momentum - Math.sqrt(this.y_speed ** 2);
            //console.log("x speed is " + this.x_speed);
            var sign_changer = Math.random();
            //console.log("sign changer is " + sign_changer);

            if (sign_changer < 0.25) {
                this.y_speed = this.y_speed * -1;
                this.x_speed = this.x_speed * -1;
            } else if (sign_changer < 0.5) {
                this.y_speed = this.y_speed * -1;
            } else if (sign_changer < 0.75) {
                this.x_speed = this.x_speed * -1;
            }
        }



        if (this.x_speed < 0){
            this.x_movement = "left";
        } else if (this.x_speed > 0){
            this.x_movement = "right";
        } else{
            this.x_movement = null;
        }

        if (this.y_speed < 0){
            this.y_movement = "up";
        } else if (this.y_speed > 0){
            this.y_movement = "down";
        } else{
            this.y_movement = null;
        }
    }
    
    //Based on the friction, determine how fast the object x and y speeds reduce
    determineFrictionValues(friction){
        var total_speed = Math.sqrt(this.x_speed ** 2) + Math.sqrt(this.y_speed ** 2);
        this.x_friction = friction * (10**-2);
        this.y_friction = friction * (10**-2);
        //console.log("proposed friction is " + (friction * (10**-2)));
    }
    
    //Move the particle based on its x and y speed
    moveSelf(){

        if (this.x_speed != null) {
            this.x += this.x_speed;
        }

        if (this.y_speed != null) {
            this.y += this.y_speed;
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
            
        }

        if ((this.y_movement === "up" && this.y_speed > -0.01) || (this.y_movement === "down" && this.y_speed < 0.01) || this.y_speed === 0){
            this.y_movement = null;
            this.y_speed = 0;
            
        }

        if (this.x_speed === 0 && this.y_speed === 0){
            this.stopped = true;
            
        }


    }

}
