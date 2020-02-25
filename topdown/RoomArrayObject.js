class RoomArray{
    constructor(canvas, room_color){
        this.array = [[],[],[],[],[],[]]
        this.fillArrayWithNulls();
        this.color = room_color;
        this.defineSpawnRoom(2, 2, canvas);
        this.current_room = this.array[2][2];
        this.definePremadeMapLayout1(canvas);
        this.associateNeighbours();
        //this.printArray();
        
    }
    
    addEntity(entity, room_row, room_col){
        console.log("adding entity to room " + room_row + " " + room_col);
        this.array[room_row][room_col].addEntity(entity);
    }
    
    //Pad out the array with nulls, so that a room doesn't necessarily have to have the first
    //spot in a row
    fillArrayWithNulls(){
        for(var i = 0; i < this.array.length; i++){
            for (var j = 0; j < 6; j++){
                this.array[i][j] = null;
            }
        }
    }
    
    //define the spawn room
    defineSpawnRoom(room_row_index, room_col_index, canvas){
        console.log("row index in method defineSpawnRoom " + room_row_index);
        this.array[room_row_index][room_col_index] = new Room(canvas, room_row_index, room_col_index, 30, "closed", "closed", "closed", "closed", this.color);
        console.log("Therefore this should be 2: " + this.array[room_row_index][room_col_index].room_row_index);
    }
    
    definePremadeMapLayout1(canvas){
        this.array[1][2] = new Room(canvas, 1, 2, 30, "closed", "closed", "closed", "closed", this.color);
        this.array[2][1] = new Room(canvas, 2, 1, 30, "closed", "closed", "closed", "closed", this.color);
    }
    
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
    
        
    //Print out the 2d array
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
