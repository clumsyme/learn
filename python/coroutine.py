from functools import wraps

def primecoroutine(func):
    @wraps(func)
    def init(*args,**kwargs):
        gen = func(*args,**kwargs)
        next(gen)
        return gen
    return init

# This makes "ave = average()" the same as "a = average()    next(a)"
@primecoroutine
def averager():
    total = 0
    count = 0
    average = None
    while True:
        new = yield average
        total += new
        count += 1
        average = total/count
        print("Average now is: ", end = '')

# We can even return value from coroutine just by making it reaching the return.
# Get the return value by:
#       try:
#           avg.send(None)
#       except Exception as e:
#           result = e.value 
def averager2():
	total = 0
	count = 0
	ave = None
	nums = []
	while True:
		new = yield
		if new == None:
			break
		total += new
		count += 1
		ave = total/count
		nums.append(new)
	return (nums, ave)
