class RangeProperty:
    def __init__(self, name, lower, higher):
        self.name = name
        self.lower = lower
        self.higher = higher
    def __get__(self, instance, objtype):
        return instance.__dict__[self.name]
    def __set__(self, instance, value):
        if value<self.lower:
            raise ValueError("{} should not be lower than {}.".format(self.name, self.lower))
        elif value>self.higher:
            raise ValueError("{} should in range {}-{}.".format(self.name, self.lower, self.higher))
        else:
            instance.__dict__[self.name] = value

class Beauty:
    age = RangeProperty("age", 16, 40)
    appearance = RangeProperty("appearance", 7, 10)
    def __init__(self, name, age, appearance):
        self.name = name
        self.age = age
        self.appearance = appearance

scarlett = Beauty("Scarlett", 31, 8)
print(scarlett)

nonbeaut = Beauty("Someone", 22, 5)