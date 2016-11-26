""" 1001 numbers between 1 to 1000, find the duplicated one."""
from functools import reduce
def only_dup(nums):
    return reduce(lambda x, y: x ^ y,
                  list(range(1, 1001)),
                  reduce(lambda x, y: x ^ y, nums))
