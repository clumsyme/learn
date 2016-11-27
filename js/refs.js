// make clear some JavaScript References

// for ... in & for ... of statement
// The for...in loop will iterate over all enumerable properties of an object.
// The for...of syntax is specific to collections, rather than all objects. 
// It will iterate in this manner over the elements of any collection that
//  has a [Symbol.iterator] property.
var dog = {
    name: "Tom",
    age: 3,
    bark: function() {
        alert("Wang~")
    }
}
for (let attr in dog) {
    console.log(attr)
}
// different *property name* is assigned to attr in for ... in statement
// name
// age
// bark

for (let n of [3, 6, 9]) {
    console.log(n)
}
// different *property value* is assigned to n in for ... of statement
// 3
// 6
// 9