# How to make a sub-dict with self define attrs, such as 
# subd[key] will return value, even if key not in subd,
# but str(key) do.
# Here it goes:
class StrDict(dict):
    def __missing__(self, key):
        try:
            if str(key) in self:
                return self[str(key)]
            raise KeyError(key)
        except KeyError:
            print("{} not in!".format(key))
    def __contains__(self, key):
        return key in self.keys() or str(key) in self.keys()
# >>>sd = StrDict({1:"one", '2':"two"})
# >>>sd[1]
# "one"
# >>>sd[2]
# "two"
# >>>sd['1']
# 1 not in
# >>>sd['2']
# "two"

# As we see, 2 is not in sd while '2' is, but sd[2] still get it's value, 
# while sd['1'] don't.
# The reason why the __contains__ method return "key in self.keys()" instead
# of "key in self" is because "key in self" will call self.__contains__ again,
# and the __contains__ will return "key in self" and then call self.__contains__, 
# it's a endless RecursionError. 
# But in the __missing__ method, we do use "in self", because this will call 
# self.__contains__ and return the correct bool-value.

# This part can be writen in another way:
# cause we want the dict return value only if key or str(key) in self, so when 
# the string is a str and it calls __missing__, it's certainly not in self.keys, both 
# it and str(it).For the __missing__ method will only be called when key is not found 
# in self.keys().
# so here's the new one:
def __missing__(self, key):
    try:
        if isinstance(key, str):
            raise KeyError
        return self[str(key)]
    except KeyError:
            print("{} not in!".format(key))
