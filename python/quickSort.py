def Qsort(table, left=0, right=None):
    if right == None:
        right = len(table) - 1
    center = (left+right) //2
    if table[left] > table[center]:
        table[left], table[center] = table[center], table[left]
    if table[center] > table[right]:
        table[center], table[right] = table[right], table[center]
    if table[left] > table[center]:
        table[left], table[center] = table[center], table[left]
    if right-left <= 2:
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
    Qsort(table, left, i-1)
    Qsort(table, i+1, right)