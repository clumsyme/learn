"""
Note that codes from line 30 through line 39 can't be written in this way:

i = left + 1
j = right - 2
while True:
    while table[i] < pivot:
        i += 1
    while table[j] > pivot:
        j -= 1

It may cause an infinite loop if table[i] == table[j] == pivot.
"""

def quicksort(table, left=0, right=None):
    if right == None:
        right = len(table) - 1
    center = (left+right) //2
    if table[left] > table[center]:
        table[left], table[center] = table[center], table[left]
    if table[center] > table[right]:
        table[center], table[right] = table[right], table[center]
    if table[left] > table[center]:
        table[left], table[center] = table[center], table[left]
    if right-left <= 2:     # If table size <= 3, it's sorted by now.
        return
    table[center], table[right-1] = table[right-1], table[center]
    pivot = table[right-1]

    i = left
    j = right - 1

    while True:
        i += 1
        j -= 1
        while table[i] < pivot:
            i += 1
        while table[j] > pivot:
            j -= 1
        if i < j:
            table[i], table[j] = table[j], table[i]
        else:
            break
    table[i], table[right-1] = table[right-1], table[i]
    quicksort(table, left, i-1)
    quicksort(table, i+1, right)