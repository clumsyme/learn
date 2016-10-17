import random
import time

SIZELIMIT = 10

def inorder(table):
    """Find if a table/list is ni order."""
    return all(table[i] <= table[i+1] for i in range(len(table)-1))

def monkeySort(table):
    """The sort function."""
    pass_ = 0
    t1 = time.time()
    while not inorder(table):
        random.shuffle(table)
        pass_ += 1
    t2 = time.time()
    return (pass_, t2-t1)

# For tables with size 2-9, find how many passes and time are used to sort it.
# Each size table has been tested for 10 times.
passes = {i:[] for i in range(2, SIZELIMIT)}
times = {j:[] for j in range(2, SIZELIMIT)}
for size in range(2, SIZELIMIT):
    for n in range(10):
        table = [random.randint(0,100) for _ in range(size)]
        result = monkeySort(table)
        passes[size].append(result[0])
        times[size].append(result[1])

# print the result
print('-'*115)
print('|{:^5}|{:^80}|{:^10}|{:^15}|'.format('size', 'passes', 'avg-pass', 'avg-time'))
print('-'*115)
for n in passes.keys():
    print('|{:^5}|{:^80}|{:^10}|{:^15}|'.format(n, str(passes[n]), sum(passes[n])/len(passes[n]), \
                 round(sum(times[n])/len(times[n]), 5)))
    print('-'*115)

""""
The main result ignoring the passes list.

----------------------------------
|size | avg-pass |   avg-time    |
----------------------------------
|  2  |   0.6    |      0.0      |
----------------------------------
|  3  |   2.5    |      0.0      |
----------------------------------
|  4  |   15.7   |      0.0      |
----------------------------------
|  5  |  166.5   |    0.00156    |
----------------------------------
|  6  |  581.0   |    0.00312    |
----------------------------------
|  7  |  2524.0  |    0.01719    |
----------------------------------
|  8  | 53801.3  |    0.40923    |
----------------------------------
|  9  | 289413.9 |    2.38884    |
----------------------------------
| 10  |2291694.4 |   20.82377    |
----------------------------------

O(n) = 0.0088e^(1.91*n) = e^(1.91*n)

OK..., monkey sort is... this.
"""