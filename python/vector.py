import math
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.angle = math.atan2(self.y, self.x)*180/math.pi
    def __abs__(self):
        return math.hypot(self.x, self.y)
    def __iter__(self):
        return (x for x in (self.x, self.y))
    def __str__(self):
        return "({}, {})".format(self.x, self.y)
    def __repr__(self):
        name = type(self).__name__
        return "{}({}, {})".format(name, *self)
    def __format__(self, fmt_spec=''):
        if fmt_spec.endswith('p'):
            fmt_spec = fmt_spec[:-1]
            coords = (abs(self), self.angle)
            outer = '<{}, {}>'
        else:
            coords = self
            outer = '({}, {})'
        com = (format(c, fmt_spec) for c in coords)
        return outer.format(*com)