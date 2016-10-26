'''
There are n bulbs that are initially off. You first turn on all the bulbs. 
Then, you turn off every second bulb. On the third round, you toggle every 
third bulb (turning on if it's off or turning off if it's on). 
For the ith round, you toggle every i bulb. For the nth round, 
you only toggle the last bulb. Find how many bulbs are on after n rounds.

Example:

Given n = 3. 

At first, the three bulbs are [off, off, off].
After first round, the three bulbs are [on, on, on].
After second round, the three bulbs are [on, off, on].
After third round, the three bulbs are [on, off, off]. 

So you should return 1, because there is only one bulb is on.
'''

def bulbSwitch(n):
    """
    O(n)--n^2
    """
    bulbs = range(1, n+1)
    total = 0
    for bulb in bulbs:
        i = 0
        for j in range(1, bulb/2+1):
            if not bulb%j:
                i += 1
        if not i%2:
            total += 1
    return total

def bulbSwitch2(n):
    """
    :type n: int
    :rtype: int
    """
    bulbs = [0 for _ in range(n)]
    for i in range(n):
        j = i
        while j < n:
            c = bulbs[j]
            bulbs[j] = [1, 0][c]
            j += (i+1)
    return sum(bulbs)

def bulbSwitch3(self, n):
    """
    :type n: int
    :rtype: int
    """
    return int(n**0.5)