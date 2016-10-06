def shellSort(table, steps = [5, 3, 1]):
    length = len(table) 
    for step in steps:
        for i in range(step, length):
            current = table[i]
            j = i
            while j >= step and table[j-step] > current:
                table[j] = table[j-step]
                j -= step
            table[j] = current
