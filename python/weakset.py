"""
A simple use of weakref.WeakSet, which will aware every one of it's item.
weakreference means it's a reference to the object but DO NOT add the reference count.
"""
import weakref

class Dog:
    def __init__(self, name):
        self.name = name
    def __repr__(self):
        return self.name

tom = Dog("Tom")
jerry = Dog("Jerry")
miki = Dog("Miki")
dogs = {tom, jerry, miki}
del tom
print(dogs)
# --->{Jerry, Miki, Tom}

wset = weakref.WeakSet()
wset.add(tom)
wset.add(jerry)
wset.add(miki)
print(list(wset))
# --->[Tom, Jerry, Miki]
del miki
print(list(wset))
# --->[Tom, Jerry]
# Dog in wset is just a weak reference to tom/jerry/miki, after miki is deleted no reference exists and it will be 
# garbage collected and no exist in wset.