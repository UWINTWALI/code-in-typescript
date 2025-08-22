/* 
.then() method is called when a Promise is successfully resolved, while .catch()
is called when a Promise is rejected. Together, they provide a powerful and readable way to
handle asynchronous success and error scenarios.
*/
const examplePromise = new Promise<string>((resolve, reject) =>{
    const random_num : number = Math.random();

    if (random_num > 0.5){
        resolve('The Promise resolved successfully');
    }else {
        reject(new Error('The promises failed to resolve.......! try to handle the error!'));
    }
});


examplePromise.then((result)=>{
    console.log(result)
}).catch((error:any)=>{
    console.error('Error', error.message)
})