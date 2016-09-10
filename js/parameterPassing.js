// It is said in JavaScript all parameters are passed by value, is this means that the behaviour descripted in 
// python/defaultparameter will not be seen in JS?
// Basic type is passed by value with no doubt, let's see reference type:
function setName(obj) {
    obj.name = "Name One"
    obj = new Object()
    obj.name = "Name Two"
}
var tom = new Object()
setName(tom)
tom.name
// >>>Name One
// In fact, the value of a reference type var's value is the object stored in memory(PJWD p.68), and var name
// is a reference of the object.
// So, when we call 
setName(tom)
// we pass the value of tom to obj, which means obj's value is the same object, that obj is a reference of the object too now.
obj.name = "Name One"
// will change the object which is also tom's value.
// Then, 
obj = new Object()
// so now obj is no longer a reference of the object now.
obj.name = "Name Two"
// will change the new object but not the one tom refer to.
// At the end, tom.name = "Name One".

// ps.
// Truely this is more like pass by reference, that's because tom is a reference type, after it pass it's value to obj, we can see
// it as that they have the same value, so obj is also a reference type var now and it refer to the same object that tom refer to.