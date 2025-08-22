type Callback = (num_1 : number, num_2 : number ) => void

function callbackFunc(callback : Callback, number_1 : number, number_2 : number) {
    callback(number_1, number_2)
}

function mult(arg1 : number, arg2 : number){
    console.log(arg1 * arg2)
}

function add(num_1: number, num_2 : number) {
    console.log(num_1 + num_2)
}

callbackFunc(mult, 10, 6);
