class GetEverything:
    def __getattr__(self, name):
        """
        Getting an inexistent attribute.
        """
        return name
    def __getattribute__(self, name):
        """
        Any attribute getting will call this method if it exists, even if the attribute exists, and __getattr__ won't be called.
        Unless explicitly call it in this method.
        But be careful:

            return self.__getattr__(self, name)

        or any other self attribute getting in this method such as

            return self.__class__, self.foo

        will come to this method and then come into an infinite recursion, unless the code is carefully coded
        to avoid it. But using the class to call it to get attribute will get rid of the recursion.

            return GetEverything.__getattribute__(self, name)

        or

            return object.__getattribute__(self, name) 
        cause this will call base class object's method to find attribute 
        and none is found so object.__getattr__(self, name) is called which means self.__getattr__(name) is called.

        """
        return GetEverything.__getattr__(self, name)


"""
The @property decorator.
Note the 'self.weight = weight', why I don't use 'self._weight = weight' is because I want to avoid any non-positive weight.
If I use _weight the __init__ may make self._weight a non-positive value. With the 'self.weight = weight' it actually doesn't set
attribute weight cause weight setter will set _weight instead in @weight.setter decorated method. 
In this way the .weight will not be non-positive even in the __init__ method.
But, this only prevent the neg-value set of .weight. If you knew the _weight attribute, you can still set item._weight = -10.

And, with the @property, the Item() instance item can't set item.weight without @weight.setter getting implemented, 
but item.__dict__['weight'] will work. However, the item.weight will still use the @property even a attribute weight is in item'set
__dict__, Unless we set Item.weight = SomeValue.

    An expression like obj.attr does not search for attr starting with obj. The search actually starts at obj.__class__, 
    and only if there is no property named attr in the class, Python looks in the obj instance itself.

    i.e
        def getter(instance):
            return 'hello'
        class C:
            pass
        cc = C()
        cc.name = 'cc'
    cc.name--->'cc'
    C.name = 'C'
    cc.name--->'cc'
    C.name = property(getter)
    cc.name--->hello
    cc.__dict__--->{'name':'cc'}
    del C.name
    cc.name--->'cc'

"""
class Item:
    def __init__(self, weight, price):
        self.weight = weight
        self.price = price
    @property
    def weight(self):
        return self._weight
    @weight.setter
    def weight(self, value):
        if value <= 0:
            raise ValueError
        else:
            self._weight = value

#------------   eq    ----------------#
class Item2:
    def __init__(self, weight, price):
        self.weight = weight
        self.price = price
    def weight_getter(self):
        return self._weight
    def weight_setter(self, value):
        if value <= 0:
            raise ValueError
        else:
            self._weight = value
    weight = property(weight_getter, weight_setter)

#---------    simplify multi-property   -----------#
def makeproperty(name):
    def name_getter(instance):
        return instance.__dict__[name]
    def name_setter(instance, value):
        if value <= 0:
            raise ValueError
        else:
            instance.__dict__[name] = value
    return property(name_getter, name_setter)

class Item3:
    weight = makeproperty("weight")
    price = makeproperty("price")
    def __init__(self, weight, price):
        self.weight = weight
        self.price = price
