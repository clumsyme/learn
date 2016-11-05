"""
Given a pattern, generate a valid solved sudoku.
"""

import random

pattern = 'FAIHBCGEDGEHIDAFCBDBCFGEAHIEDABIFHGCBHFECGIDAICGDAHBFECFEAHIDBGAGBCFDEIHHIDGEBCAF'
def generate(pattern):
    nums = [str(i) for i in range(1, 10)]
    i1 = [0, 1, 2]
    i2 = [3, 4, 5]
    i3 = [6, 7, 8]
    # shuffle nums
    random.shuffle(nums)
    dicn = dict(zip(list('ABCDEFGHI'), nums))
    for c in dicn:
        pattern = pattern.replace(c, dicn[c])
    sudoku = pattern
    # shuffle rows
    random.shuffle(i1)
    random.shuffle(i2)
    random.shuffle(i3)
    rows = sum((i1, i2, i3), [])
    sudoku = ''.join([sudoku[i*9:i*9+9] for i in rows])
    # shuffle cols
    random.shuffle(i1)
    random.shuffle(i2)
    random.shuffle(i3)
    cols = sum((i1, i2, i3), [])
    sudoku = ''.join([sudoku[i*9:i*9+9][j] for i in range(9) for j in cols])
    # shuffle brows
    random.shuffle(i1)
    sudoku = ''.join([sudoku[i*3*9:i*3*9+27] for i in i1])
    # shuffle bcols
    random.shuffle(i1)
    sudoku = ''.join([sudoku[i*9:i*9+9][j*3:j*3+3] for i in range(9) for j in i1])
    return sudoku
