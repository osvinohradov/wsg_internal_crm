// export function deep_copy(target, source){
//     console.log('111111111111')
//     for(let prop in source){
//         if(target.hasOwnProperty(prop) && typeof target[prop] == 'object'){
//             target[prop] = deep_copy(target[prop], source[prop]);
//         }
//         else if(target.hasOwnProperty(prop)){
//             target[prop] = source[prop];
//         }
//     }
//     return target;
// }

export function deep_copy(parent, child) {
    var i,
        toString = Object.prototype.toString,
        aStr = "[object Array]";

    child = child || {}; // проверка наличия второго аргумента.

    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            if (typeof parent[i] == "object") {
                child[i] = (toString.call(parent[i]) == aStr) ? [] : {};
                extendDeep(parent[i], child[i]); // рекурсивный вызов, для того что бы скопировать все свойства объякта или элементы массива.
            }
            else {
                child[i] = parent[i];
            }
        }
    }

    return child;
}