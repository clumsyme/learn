# Functions in python are objects, at the same time, objects can also be made to behave just like function.
# As long as it implements a __call__ method.

import random
class Dice:
    def __init__(self, values):
        self._values = list(values)  #avoid modify values.
    def throw(self):
        return random.choice(self._values)
    def __call__(self):
        return self.throw()

dice = Dice([1,2,3,4,5,6])
dice()
# >>>6
dice()
# >>>2
# ...