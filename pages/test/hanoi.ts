// @ts-ignore
const hanoi = () => {

    const a = [1, 2, 3, 4, 5];
    const b = [];
    const c = [];

    while (a.length>0){
        b.unshift(a[0]);
        a.shift();
    }

    while (b.length>0){
        c.unshift(b[0]);
        b.shift();
    }

    return c;
};

console.log(hanoi())