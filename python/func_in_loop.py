# In @ruanyf's ECMAScript course: let and const, the 'let' command will 
# make var only aviable in code block.
# i.e.
#     var a = []
#     for (var i = 0;i<10;i++){
#         a[i] = function(){
#         console.log(i)
#         }
#     }
#     a[5]() // 10
# That's because every a[n] is the function console.log(i), and this i 
# refer to the global 'var i' which will be 10 after the for loop, so every
# a[n]() will be 10.
# We can use 'let' to make it's behavior defferent.
#     var a = []
#     for (let i = 0;i<10;i++){
#         a[i] = function(){
#         console.log(i)
#         }
#     }
#     a[5]() //5
# In every loop, i gets a different value, and defined a different function.
# That's the example in @ruanyf's article, while I've no deep understanding 
# in JS's function details currently.

# Anyway, I'm thinking how the code should be in python.
# append different functions to a list in for loop, based on the index of the loop.
a = []
for i in range(10):
    def f():
        return i
    a.append(f)
# a[5]()
# >>>10
# Obviously, every 'f' in a is a different object, but every f's 'return i'
# refer to the global i, which will be 10 after the loop.
# So we should make every i different in every f.
a = []
for i in range(10):
    def f():
        j = i
        return j
    a.append(f)
# Will this work?
# a[5]()
# >>>10
# NO!
# As we see, the code block in f will execute when f is called, so every f
# will first execute 'j = i', so j will be 10, then return 10.
a = []
for i in range(10):
    j = i
    def f():
        return j
    a.append(f)
# And this?
# a[5]()
# >>>9
# NOPE!
# Oh, in fact, every f execute 'return j', and j is not the j when f's defined, 
# j is a global variable declared in loop 'i=9', so j==9, and every 'return j' returns 9.
# So, how?
# We should make the 'i' decided when the function is defined, 
# not when it's called. What's decided when a function is defined? Yes, the default
# parameter which we disscused in defaultparameter.py.
a = []
for i in range(10):
    def f(i=i):
        return i
    a.append(f)
# a[5]()
# >>>5
# It works!
# Here's a simple version:
a = [lambda i=i:i for i in range(10)]

# ps:
# In the final version, the returned i is in fact in f's scope, but not the outer i,
# it just get the outer i's value by i=i when f's defined,and has the same name,
# but does no effect to the outer one.
# To make it more clear, we can write the code this way: name it j rather than i in f's scope.
a = []
for i in range(10):
    def f(j=i):
        return j
    a.append(f)
    
a = [lambda j=i:j for i in range(10)]
