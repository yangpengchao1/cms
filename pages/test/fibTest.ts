// @ts-ignore
function fibTest(num) {
    if (num <= 2) {
        return 1
    }
    return fibTest(num - 1) + fibTest(num - 2);
}

console.log(fibTest(6))

