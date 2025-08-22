/*

the Promise.all() method with an example.
Explain & TIP: Promise.all() takes an iterable of Promises and
returns a single Promise
that resolves when all of the Promises in the iterable have
resolved or when the iterable
contains no Promises. It is rejected if any of the passed
Promises are rejected.
his method is useful for aggregating the results of multiple
promises.

*/


const promise_1 = new Promise<string>((resolve, reject)=>{
    setTimeout(()=>{
        resolve('Promise 1 resoved successfully')
    }, 2000)
})

const promise_2 = new Promise<string>((resolve, reject) =>{
    setTimeout(()=>{
        resolve('Promise 2 resolved Now!')
    }, 1000)
})

const promise_3 = new Promise <string>((resolve, reject)=>{
    const randomNumber : number = Math.random()
    if(randomNumber > 0.5){
        resolve('Promise 3 resolves successfully ')
    }else reject(new Error('There is Error resolving the promse Three!!'))
})

Promise.all([promise_1, promise_2, promise_3 ])
    .then((result)=>{
        console.log(result)
    })
    .catch((error:any)=>{
        console.error("There was an error resolving one of the promises", error.message)
    })