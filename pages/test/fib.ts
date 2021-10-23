// @ts-ignore
const fib = (num) => {
    if(num===0){
        return 0
    }

    if (num <= 2) {
        return 1;
    }

    let prev1=1;
    let prev2=1;
    while (num>2){
       let sum=prev1+prev2;
       prev1=prev2;
       prev2=sum;
       num--;
    }
    return prev2;
}

console.log(fib(8));