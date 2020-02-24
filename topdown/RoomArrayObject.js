class RoomArray{
    constructor(canvas){
        this.array = [[],[],[],[],[],[]]
        this.fillArrayWithNulls();
        this.defineSpawnRoom(2, 2, canvas);
        this.current_room = this.array[2][2];
    }
    
    //Pad out the array with nulls, so that a room doesn't necessarily have to have the first
    //spot in a row
    fillArrayWithNulls(){
        for(var i; i < this.array.length; i++){
            for (var j; j < 6; j++){
                this.array[i][j] = "empty";
            }
        }
    }
    
    //define the spawn room
    defineSpawnRoom(row_index, col_index, canvas){
        this.array[row_index][col_index] = new Room(canvas, (row_index * this.array[0].length ) + col_index, 30, "none", "closed", "closed", "closed");
    }
    
    //Print out the 2d array
    printArray(){
        for (var i; i < this.array.length; i++){
            console.log("Row: " + i);
            for (var j; j < this.array.length; j++){
                console.log("At col " + j + ", this is a " + this.array[i][j]);
            }
        }
    }
    
}
