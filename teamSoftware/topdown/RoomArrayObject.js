//The room array acts as the map, recording all rooms and their neighbouring rooms
class RoomArray{
    constructor(canvas, room_color){
        this.array = [[],[],[],[],[],[]]
        this.fillArrayWithNulls();
        //How many rooms there are
        this.room_counter = 0;
        //How many entities there are in total
        this.entity_counter = 0;
        this.color = room_color;
        //The spawn room has its position hard-coded in the array
        this.defineSpawnRoom(2, 2, canvas);
        //The current room the player is in will start off as the spawn room
        this.current_room = this.array[2][2];
        
        
    }
    
    //Add an entity to the room given by its array index
    addEntity(entity, room_row, room_col){
        this.array[room_row][room_col].addEntity(entity);
    }
    
    //Pad out the array with nulls so that rooms don't always have to be the first in the list
    fillArrayWithNulls(){
        for(var i = 0; i < this.array.length; i++){
            for (var j = 0; j < 6; j++){
                this.array[i][j] = null;
            }
        }
    }
    
    //define the spawn room
    defineSpawnRoom(room_row_index, room_col_index, canvas){
        this.array[room_row_index][room_col_index] = new Room(canvas, this, room_row_index, room_col_index, 30, "closed", "closed", "closed", "closed", this.color, 15);
    }
    
    //A premade map layout. Used to debug. Not called by default.
    definePremadeMapLayout1(canvas){
        //console.log("spawn room is " + this.current_room);
        this.array[1][2] = new Room(canvas, this, 1, 2, 30, "closed", "closed", "closed", "closed", this.color);
        this.array[2][1] = new Room(canvas, this, 2, 1, 30, "closed", "closed", "closed", "closed", this.color);
        this.current_room.openGate("left");
        this.array[2][1].openGate("right");
        this.current_room.openGate("upper");
        this.array[1][2].openGate("lower");
    }
    
    //Generate enemies across the map. Not used currently, an improved system is being used which allows for scalable difficulty.
    generateEnemies(hero){
        for (var i = 0; i < this.array.length; i++){
            for (var j = 0; j < this.array[i].length; j++){
                if (this.array[i][j] != null){
                    this.array[i][j].generateEnemies(hero, 2);
                }
            }
        }
    }
    
    //Populate rooms with enemies. It allows for scalable difficulty, by placing harder rooms further into the map.
    populateRoom(hero, room, room_quantity){
        if (hero == null){
            alert("Undefined hero!");
        } else{
            if (this.room_counter < 2 || (this.room_counter / room_quantity) * 100 < 10){                       
                room.generateEnemies(hero, 1, 1);
            } else if ((this.room_counter / room_quantity) * 100 < 30){
                room.generateEnemies(hero, 2, 2);
            } else if ((this.room_counter / room_quantity) * 100 < 60){
                room.generateEnemies(hero, 3, 3);
            } else if ((this.room_counter == room_quantity)){
                room.generateEnemies(hero, 1, 5);
            } else {
                room.generateEnemies(hero, 4, 1);
            }
        }
        
        
    }
    
    //Start generating rooms for the map
    beginGeneratingRooms(canvas, room_quantity, start_room, hero){
        this.populateRoom(hero, this.current_room, room_quantity);
        this.generateRooms(canvas, room_quantity, start_room, hero);
    }
    
    //Generate rooms to create a random map.
    generateRooms(canvas, room_quantity, start_room, hero){
        if (room_quantity <= 0){
            return room_quantity;
        }
        
        if (room_quantity == this.room_counter){
            var wall_quantity = 5;
        } else {
            var wall_quantity = 15;
        }
        var rnumber = Math.round(Math.random() * 3);
        
        if (rnumber === 0 && start_room.room_row_index > 0 && this.array[start_room.room_row_index -1][start_room.room_col_index] == null && this.room_counter < room_quantity){
            this.array[start_room.room_row_index - 1][start_room.room_col_index] = new Room(canvas, this, start_room.room_row_index - 1, start_room.room_col_index, 30, "closed", "closed", "closed", "closed", this.color, wall_quantity);
            start_room.createGate("upper");
            this.array[start_room.room_row_index - 1][start_room.room_col_index].createGate("lower");
            room_quantity -= 1;
            this.room_counter++;
            this.populateRoom(hero, this.array[start_room.room_row_index - 1][start_room.room_col_index], room_quantity);
            room_quantity = this.generateRooms(canvas, room_quantity, this.array[start_room.room_row_index - 1][start_room.room_col_index], hero);
                       
        } 
        
        if (rnumber === 1 && start_room.room_col_index < this.array[0].length - 1 && this.array[start_room.room_row_index][start_room.room_col_index + 1] == null && this.room_counter < room_quantity){
            this.array[start_room.room_row_index][start_room.room_col_index + 1] = new Room(canvas, this, start_room.room_row_index, start_room.room_col_index + 1, 30, "closed", "closed", "closed", "closed", this.color, wall_quantity);
            start_room.createGate("right");
            this.array[start_room.room_row_index][start_room.room_col_index + 1].createGate("left");
            room_quantity -= 1;
            this.room_counter++;
            this.populateRoom(hero, this.array[start_room.room_row_index][start_room.room_col_index + 1], room_quantity);
            room_quantity = this.generateRooms(canvas, room_quantity, this.array[start_room.room_row_index][start_room.room_col_index + 1], hero);
            
            
        }
        
        if (rnumber === 2 && start_room.room_row_index < this.array.length -1 && this.array[start_room.room_row_index + 1][start_room.room_col_index] == null && this.room_counter < room_quantity){
            this.array[start_room.room_row_index + 1][start_room.room_col_index] = new Room(canvas, this, start_room.room_row_index + 1, start_room.room_col_index, 30, "closed", "closed", "closed", "closed", this.color, wall_quantity);
            start_room.createGate("lower");
            this.array[start_room.room_row_index + 1][start_room.room_col_index].createGate("upper");
            room_quantity -= 1;
            this.room_counter++;
            this.populateRoom(hero, this.array[start_room.room_row_index + 1][start_room.room_col_index], room_quantity);
            room_quantity = this.generateRooms(canvas, room_quantity, this.array[start_room.room_row_index + 1][start_room.room_col_index], hero);
            
            
        }
        
        if (rnumber === 3 && start_room.room_col_index > 0 && this.array[start_room.room_row_index][start_room.room_col_index -1] == null && this.room_counter < room_quantity){
            this.array[start_room.room_row_index][start_room.room_col_index - 1] = new Room(canvas, this, start_room.room_row_index, start_room.room_col_index - 1, 30, "closed", "closed", "closed", "closed", this.color, wall_quantity);
            start_room.createGate("left");
            this.array[start_room.room_row_index][start_room.room_col_index - 1].createGate("right");
            room_quantity -= 1;
            this.room_counter++;
            this.populateRoom(hero, this.array[start_room.room_row_index][start_room.room_col_index - 1], room_quantity);
            room_quantity = this.generateRooms(canvas, room_quantity, this.array[start_room.room_row_index][start_room.room_col_index - 1], hero);
            
            
        }
        
        //If there are more rooms to be generated, you've hit a dead end, rooms can start branching out
        if (this.room_counter < room_quantity && this.checkSurroundingRooms(start_room.room_row_index, start_room.room_col_index)){
            room_quantity = this.generateRooms(canvas, room_quantity, start_room, hero);
        }
            
            
           return room_quantity;
    }
    
    
    //Outdated function. Now done using openGate
    associateNeighbours(){
        for (var i = 0; i < this.array.length; i++){
            for (var j; j < this.array[i].length; j++){
                if (this.array[i][j] != null){
                    //If there is a room on the left, set it as this room's left neighbour
                    if (j > 0 && this.array[i][j-1] != null){
                        this.array[i][j].left_neighbour = this.array[i][j-1];
                    } else if (j < this.array[i].length && this.array[i][j+1] != null){
                        this.array[i][j].right_neighbour = this.array[i][j+1];
                    }
                }
            }
        }
    }
    
    //Check around a room to see if has the space needed to branch out
    checkSurroundingRooms(row_index, col_index){
        if (row_index > 0){
            if (this.array[row_index - 1][col_index] == null){
                return true;
            }
        }
        
        if (row_index < this.array.length - 1){
            if (this.array[row_index + 1][col_index] == null){
                return true;
            }
        }
        
        if (col_index > 0){
            if (this.array[row_index][col_index - 1] == null){
                return true;
            }
        }
        
        if (col_index < this.array[row_index].length - 1){
            if (this.array[row_index][col_index + 1] == null){
                return true;
            }
        }
        
        return false;
    }
    
        
    //Print out the 2d array. Used for debugging.
    printArray(){
        console.log("printing array...");
        for (var i = 0; i < this.array.length; i++){
            console.log("Row: " + i);
            for (var j = 0; j < this.array.length; j++){
                console.log("At col " + j + ", this is a " + this.array[i][j]);
                if (this.array[i][j] != null){
                    console.log("This room says it's at row " + this.array[i][j].room_row_index + " and column " + this.array[i][j].room_col_index);
                }
            }
        }
    }
    
}
