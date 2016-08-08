# This piece of code shows the use of singledispatch decorator in functools,
# which will make a function behaves differently base on the type of it's first arg.
from functools import singledispatch

# We declare a new class, and make a new isinstance of it.
class Beauty:
    def __init__(self, name):
        self.name = name
taylor = Beauty("Taylor Swift")

#Then the function.
@singledispatch
def intro(obj):
    print("    Hello, world!")

#Then to register the function to different types.
@intro.register(str)
def _(obj):
    print("    Hello,", obj)

@intro.register(list)
def _(obj):
    for ob in obj:
        print("    {0} is in {1}.".format(ob, obj))

@intro.register(dict)
def _(obj):
    for key in obj:
        print("    {0} is {2}.".format(key, obj, obj[key]))

@intro.register(Beauty)
def _(obj):
    print("    Wow,that's {} there, isn't she a vision.".format(obj.name))

to_be_introed = [object,
                "May the force be with you.",
                [2,'s',3],
                {"Guard":"Kobe Bryant", "Center":"Shaq O'neal"},
                taylor
                ]

for obj in to_be_introed:
    print("Function intro behave on type {}:".format(type(obj).__name__))
    intro(obj)

#Here's the outcomes:
# Function intro behave on type type:
#     Hello, world!
# Function intro behave on type str:
#     Hello, May the force be with you.
# Function intro behave on type list:
#     2 is in [2, 's', 3].
#     s is in [2, 's', 3].
#     3 is in [2, 's', 3].
# Function intro behave on type dict:
#     Center is Shaq O'neal.
#     Guard is Kobe Bryant.
# Function intro behave on type Beauty:
#     Wow,that's Taylor Swift there, isn't she a vision.
