def mergeSort(table, left=0, right=None):
    """Note that last line can't be written in this way:

        table = sortedTable

    Cause 'table' in mergeSort function is just a reference to the table object, 
    if we do that, 'table' will just refer to where sortedTable is referring to.
    Thus no change is made in table object.
    """
    if right == None:
        right = len(table) - 1
    if right-left < 1:
        return
    middle = (left+right)//2
    mergeSort(table, left, middle)
    mergeSort(table, middle+1, right)
    i = left
    j = middle + 1
    current = left
    sortedTable = []
    while current <= right:
        if j > right or (i <= middle and table[i]<table[j]):
            sortedTable.append(table[i])
            i += 1
        else:
            sortedTable.append(table[j])
            j += 1
        current += 1
    table[left:right+1] = sortedTable