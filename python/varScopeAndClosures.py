# To learn closures in python, let's first take a look at the variable scope that give me some confusion sometimes.

###############################################
def p(a):
    print(a)
    print(b)
p(1)
#     >>>1
#     Traceback (most recent call last):
#     ......
# Because b is not defined.

###############################################
b=2
def p1(a):
    print(a)
    print(b)
p1(1)
    # >>>1
    # 2
# That's OK.

###############################################
b=2
def p2(a):
    print(a)
    print(b)
    b=3
p2(1)
#     >>>1
#     Traceback (most recent call last):
#     ......
# That's not that OK now.

#######################################     WHY     #############################################
# We can see the local b is defined after the "print(b)" is called, so we may think the b in "print(b)" is the global b.
# But that's not what's going on.
# Function is first-class object, so when the function p is defined, p is a function object, and b is a local variable
# is decided. So when "print(b)" is called, it will try to fetch b from the local environemnt but no b is found.

from dis import dis
dis(p1)
#       2           0 LOAD_GLOBAL              0 (print)
#               3 LOAD_FAST                0 (a)
#               6 CALL_FUNCTION            1 (1 positional, 0 keyword pair)
#               9 POP_TOP

#   3          10 LOAD_GLOBAL              0 (print)
#              13 LOAD_GLOBAL              1 (b)
#              16 CALL_FUNCTION            1 (1 positional, 0 keyword pair)
#              19 POP_TOP
#              20 LOAD_CONST               0 (None)
#              23 RETURN_VALUE
dis(p2)
#     2           0 LOAD_GLOBAL              0 (print)
#               3 LOAD_FAST                0 (a)
#               6 CALL_FUNCTION            1 (1 positional, 0 keyword pair)
#               9 POP_TOP

#   3          10 LOAD_GLOBAL              0 (print)
#              13 LOAD_FAST                1 (b)
#              16 CALL_FUNCTION            1 (1 positional, 0 keyword pair)
#              19 POP_TOP

#   4          20 LOAD_CONST               1 (8)
#              23 STORE_FAST               1 (b)
#              26 LOAD_CONST               0 (None)
#              29 RETURN_VALUE
# We can see the load of b in p1 is LOAD_GLOBAL, and in p2 is LOAD_FAST.
######################################     WHY      ##############################################

####################################     CLOSURES      ###########################################
# Now let's move to closures.
#       Actually, a closure is function with an extended scope that encompasses non-global
#       variables referenced in the body of the function but not defined there. It does not matter
#       whether the function is anonymous or not, what matters is that it can access non-global
#       variables that are defined outside of its body.
#       ref:pluent python.p192.

def get_avg():
    values = []
    def avg(value):
        values.append(value)
        return sum(values) / len(values)
    return avg

#   avg = get_avg()
#   avg(10)
#   >>>10
#   avg(11)
#   >>>10.5
#   avg(12)
#   >>>11
# When we call avg(value), the scope of get_avg is already gone, which is the scope where values is defined,
# and values is a free variable in avg's scope, which means it's not bound to the local scope.
# Let's inspect the returned avg function/object.
avg.__code__.co_varnames
#   >>>('value',)
avg.__code__.co_freevars
#   >>>('values',)
avg.__closure__
#   >>>(<cell at 0x000001BAFF2E1AC8: list object at 0x000001BAFF3174C8>,)
avg.__closure__[0].cell_contents
#   >>>[10,11]
# Now we see, the free variable 'values' still exist even when it's scope is gone.And that's closures, function retains the
# bind to free variable that exist when it is defined, so it can be used later.

# To make this more efficient, we can make the function do not calculate the sum of a list every time.
###################################
def get_avg():
    count = 0
    total = 0
    def avg(value):
        count += 1
        total += value
        return total / count
    return avg
# But this one will not work, for for int type, count += 1 equals count = count+1, which makes a assignment and make count/total
# local variables other than free variables. Why the previous one will work is because we never assign values in avg. That's a 
# good use of mutable objects.
# The nonlocal declaration will make it work.
####################################
def get_avg():
    count = 0
    total = 0
    def avg(value):
        nonlocal count, total
        count += 1
        total += value
        return total / count
    return avg
#        If a new value is assigned to a nonlocal variable, the binding stored in the closure is
#       changed.


#-------------------   ps   ----------------------#
# In fact we can use the fact that list/dict names are only references of list/dict objects and functions are objects to make the 
# above work without closure, this take advantage what's disscussed in defaultparameter.py.
def avg(n, values=[]):
    values.append(n)
    return sum(values) / (len(values))

def avg(n, dic={"total":0, "count":0}):
    dic["count"] += 1
    dic["total"] += n
    return dic["total"] / dic["count"]  