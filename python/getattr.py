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

"""
The Items behave like the descriptor. Which is a class with __get__ or __set__ implemented.
Item3.weight is a descriptor instance. Which means

    weight = Quantity("weight")

is just like

    weight = makeproperty("weight")

which is just like

    @property
    def weight():...
    @weight.setter
    def weight(...):...

"""
class Quantity:
    def __init__(self, name):
        self.name = name
    def __set__(self, instance, value):
        """
        put value in instance's __dict__ instead using the setattr() to avoid a infinite recursion.
        """
        if value > 0:
            instance.__dict__[self.name] = value
        else:
            raise ValueError('value must be > 0')

class Item4:
    weight = Quantity('weight')
    price = Quantity('price')
    def __init__(self, weight, price):
        """
        Here with the weight implemented as the class attribute, the 'self.weight = weight' will use Item4.weight's __set__ method.
        Just like this snippet will execute name_setter in makeproperty(weight).

        'self.weight = weight' equals to 'Item4.weight.__set__(self, weight)'
        first weight is the descriptor instance, second weight is the argument weight.
        """
        self.weight = weight    # inside it: Item4.weight.__set__(self, weight)
        self.price = price

#------    avoid pass argument to Quantity    ---------#
class Quantity2:
    """
    As weight/price are descriptor instance as Item's attribute, and Item's instance no need to know how the attribute is stored, 
    there's no need that attribute 'weight' stored in item.__dict__ named 'weight', the following is a implemention.
    """
    __counter = 0
    def __init__(self):
        cls = self.__class__
        prefix = cls.__name__
        index = cls.__counter
        self.storage_name = '_{}#{}'.format(prefix, index)
        cls.__counter += 1
    def __get__(self, instance, owner):
        """
        __get__ need be implemented cause item.weight will come to getattr(item, 'weight') while the real name is 'Quantity#0'.
        And here we can use getattr() and setattr() cause we don't get instance's weight and no descriptor will be invloved.
        """
        return getattr(instance, self.storage_name)
    def __set__(self, instance, value):
        if value > 0:
            setattr(instance, self.storage_name, value)
        else:
            raise ValueError('value must be > 0')

        
class Item5:
    weight = Quantity2()
    price = Quantity2()
    def __init__(self, weight, price):
        self.weight = weight
        self.price = price
# Another way to define a descriptor class which can both handle weight/price numbers and name string is defined in
# Fluent Python p.640 using abc inheritence.
"""
Compare property and descriptor:
    descriptor:
        with __get__
            item.name will search item.__dict__ firstly and then call __get__
            item.name = value will shadow __get__ and modify item.__dict__
        with __set__
            item.name will search item.__dict__ firstly, then it's the class attribute descriptor instance
            item.name = value will call __set__ with no modify item.__dict__
        with __get__ & __set__       <---(*overriding descriptor)
            item.name will always call __get__ firstly, then item.__dict__
            item.name = value will call __set__
    
    property:
        item.name will always search @property firstly, then item.__dict__
        *In fact, @property is a descriptor which implements both __get__ and __set__ even we don't define __set__ by hand.
        *That's why item.name will always search @property firstly: set will be forbiden by raise error or use __set__, 

ps:
methods are descriptors with __get__ but no __set__, so item.method is a bound method and Item.method is a function.
A bound method means it will bind item as it's first argument.
And 'item.method = value' will shadow the bound method just as the "with __get__" descriptor above behave. ***No influence special method.
"""