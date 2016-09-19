"""
A class's instance is iterable if the class has implemented __iter__ method, otherwise if __getitem__ method is implemented,
when iterate python create a iterator which will fetch items by order and the index starts with 0.
Or if none of __iter__ or __getitem__ is implemented, a TypeError will be raised.
"""
class Box:
    def __init__(self, items):
        self.items = list(items)
    def __getitem__(self, index):
        return self.items[index]

fruitbox = Box(['apple', 'pear', 'banana', 'orange'])
for fruit in fruitbox:
    print(fruit)
### OUTPUT ###
# apple
# pear
# banana
# orange
"""
What happens to an Iterable in a for loop can be explained as the next.
And that's how __iter__ in Iterable works. __iter__ will return an Iterator and use it to loop.
An Iterable should always implement __iter__ while __getitem__ will make it work as well, FOR NOW.

Of course we can create our own Iteraor class and make it's instance the Iterable's __iter__ method return value, 
and that's the iterator pattern in many languages. But in python we mostly don't need to create it cause dict/set/listin... python
are all iterable so we can just use iter(ds) to get a iterator as __iter__'s return value.
"""
s = "ABC"
for c in s:
    print(c)
#------------------------#
s = "ABC"
siter = iter(s)
while True:
    try:
        print(next(siter))
    except StopIteration:
        del siter
        break
"""
Iterator is subclass of Iterable. It's __iter__ method will return self and it has another method __next__.
As defined in collections.abc, if a class (or any of it's super class) implement __next__ and __iter__, 
it will be recognized as a subclass of Iterator.

One thing: an Iterator's __iter__ always return self.
So if we want to reset an iterator(such as it) during a loop, iter(it) just return it itself, 
we should recreate the iterator instead.
Iterator is Iterable of course.
"""
from collections.abc import *
class Ite:
    def __iter__(self):
        pass
    def __next__(self):
        pass
### OUTPUT ###
# issubclass(Ite, Iterator) ----> True
# ite= Ite()
# isinstance(ite, Iterator) ----> True
# while as __len__ for Sized, though issubclass(Ite, Iterator), Iterator is not in Ite's __mro__.
# Ite.__mro__ ----> (<class '__main__.I'>, <class 'object'>)
"""
As it's bad idea for us to create our own iterator to iterate itself, the generator is a better choice.
genchar is a generator function, 
gc is a generator,
when 'for char in genchar()' is executed, python just create a generator via iter(genchar()) and iterate through this generator.
the generator-function will execute until it meet yield and yield the value out and paused, the next() will make it continue.
After "print('c')", iteration stops.
"""
def genchar():
    print('a')
    yield 'A'
    print('b')
    yield 'B'
    print('c')
gc = genchar()
"""
Since this we can make __init__ a generator function to make it work.
As for this, the __iter__ do get a Iterator, which means:
    for the version return an Iterator, "foo = __iter__()" make foo an Iterator in background for iteration,
    and for generator-function version, "foo = __iter__()" also make foo a generator which also be an Iterator.
"""
class Box2:
    def __init__(self, items):
        self.items = list(items)
    def __iter__(self):
        for item in self.items:
            yield item
"""
Cause here we build a new list in Box to store items(avoid modify the original one), and then return 
a Iterator for iteration in __iter__, it's not memory friendly. The next will just create a iterator
to save memory.
We can also make it shorter by generator-comprehension.
This time __iter__ is a instance method rather than a generator-function, but it return a generator.
"""
class Box3:
    def __init__(self, items):
        self.items = items                          # No new list is created.
    def __iter__(self):
        return (item for item in iter(self.items))  # Just a gemerator(Iterator).

"""
A generator to create prime number.

    primenumber = pngenerator()
    for i in range(100):
        print(next(primenumber))

    The above code will show the first 100 prime numbers.
"""
def pngenerator():
    i = 2
    while True:
        for j in range(2,i):
            if not i%j:
                i += 1
                break
        else:
            yield i
            i += 1
"""
An arithmetic progression. 
If all we want is implement the __iter__ we can just write it as a generator function.
"""
class ArithmeticProgression:
    def __init__(self, begin, step, end=None):
        self.begin = begin
        self.end = end
        self.step = step
    def __iter__(self):
        current = self.begin
        endless = self.end is None
        while endless or current < self.end:
            yield current
            current += self.step

#----------------------------#
def aritprog(begin, step, end=None):
    current = begin
    endless = end is None
    while endless or current<end:
        yield current
        current += step

"""
Some builtin generator functions in itertools will be introduced.
"""
import itertools
ge1 = itertools.count(1,2)  # An endless arithmetic progression.
ge2 = itertools.takewhile(lambda x: x<10, itertool.count(1,2))   # Behave like filter, let it stop.
ge3 = itertools.compress(range(10), [0,1,1,0,0,0,1,1,1,0])  # return n for n in range(10) if the same index in the list is considered True.
ge4 = itertools.dropwhile(lambda x:x<5, range(10))  # drop item if x<5, once x>=5, stop dropping and get all remains.
ge5 = itertools.takewhile(lambda x:x<5, range(10))  # take item if x<5, once x>=5, stop taking and get all taked.
ge6 = itertools.filterfalse(lambda x:x<5, range(10))    # filter when x<5 False.
ge7 = itertools.isslice('hello', 0,4,2) # like 'hello'[0:4:2] but is generated one by one.

ge8 = itertools.accumulate([1,2,3,4,5]) # list(ge8)--->[1,3,6,10,15]
ge9 = itertools.accumulate([5,2,3,8,1], max)    # list(ge9)--->[5,5,5,8,8]
ge10 = itertools.chain(range(10), range(10,20))  # range(20)
ge11 = itertools.combinations("ABC", 2) # combinations.
ge12 = itertools.permutations("ABC", 2) # permutations.
ge13 = itertools.groupby(['duck', 'eagle', 'rat', 'giraffe', 'bear','bat', 'dolphin', 'shark', 'lion'], len)    # yield a tuple with n generators generate objects based on len.

"""
And the 'yield from' sytanx.
"""
def yf(its):
    for it in its:
        for item in it:
            yield item
#---------------------#
def yfrom(its):
    for it in its:
        yield from it