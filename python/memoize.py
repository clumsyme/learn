# code from:https://www.quora.com/What-are-some-hidden-features-of-Python/answer/Jonathan-Goldsmith
# to memoize highly recursive functions
class memoize:
    def __init__(self, f):
        self.f = f
        self.dict = {}
    def __call__(self, *args):
        if not args in self.dict:
            self.dict[args] = self.f(*args)
        return self.dict[args]
 
@memoize
def fib(n):
    if n < 2:
        return 1
    return fib(n-1) + fib(n-2) #turn expensive calculations into dict lookups!

print(fib(3))
print(fib(100))

# in python3, we can also use the bulit-in decorator lru_cache in functools.
from functools import lru_cache

@lru_cache(maxsize = None)
def fib(n):
    if n<2:
        return n
    else:
        return fib(n-1)+fib(n-2)