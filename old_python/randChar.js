function gen_random_string(length){

    var rand_string = '';
    var rand_char   = 'abcdefghijklmnopqrstuvwxyz';
    var charLength  = rand_char.length;

    for(var i = 0; i < length; i++) {
        rand_string += rand_char.charAt(Math.floor(Math.random() * charLength));
    }
    return rand_string
}

console.log(gen_random_string(7))
