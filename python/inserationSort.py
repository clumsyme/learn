def insertionSort(table):
    length = len(table)
    for p in range(length):
        j = p
        current = table[p]
        while j>0 and table[j-1]>current:
            table[j] = table[j-1]
            j -= 1
        table[j] = current
