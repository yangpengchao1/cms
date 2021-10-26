// @ts-ignore
function deepClone(obj: any) {
    if (typeof obj === "object") {
        let newObj = {};
        for (const key in obj) {
            // @ts-ignore
            newObj[key] = deepClone(obj[key])
        }
        return newObj;
    }
    return obj;
}