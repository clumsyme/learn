"""
Metaclass is a class that create classes.
Object define class, type create class. 
Any class is subclass of object, and instance of type.
Object is instance of type, type is subclass of object.
Type is instance of itself. Object is subclass of itself.

Metaclass is subclass of type which will create class just as type does.

    class Meta(type):
        def __init__(cls, name, bases, dic):
            ...
    
    class C(metaclass=Meta):
        def __init__(self):
            ...

For the snippets above, in the stage of creating C, class C will be created firstly, 
just after it's created it will be passed to Meta's __init__ as first argument,
after modified in Meta it's returned as C.
This just behave like a decorator, and it can be acomplished by a decorator,
but decorator can not be inherited.

    class SC(C):
        ...
will have same metaclass in this way.
"""
class Meta(type):
    def __init__(cls, name, bases, dic):
        def method(self):
            print("Method")
        cls.foo = "bar"
        cls.method = method

class C(metaclass=Meta):
    pass
# C.foo --->"bar"
# C.method(C()) ---> "Method"