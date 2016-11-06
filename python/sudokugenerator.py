"""
Given a pattern, generate a valid solved sudoku.
"""
import re
import random

pattern = 'E8FC2GDIA7B1ID5C6HID3FH1GB5A547I6HCBHGBA3DIEFCFI2E817D2CE8AI6DGD1G5FC2H9FIHD7BE1C'
class Sudoku:
    def __init__(self, pattern):
        self.pattern = pattern
    def shuffle(self):
        nums = [str(i) for i in range(1, 10)]
        chars = 'ABCDEFGHI'
        i1 = [0, 1, 2]
        i2 = [3, 4, 5]
        i3 = [6, 7, 8]
        # shuffle nums
        random.shuffle(nums)
        chars = [chars[int(_)-1] for _ in nums]
        dicd = dict(zip(list('123456789'), nums))
        dicw = dict(zip(list('ABCDEFGHI'), chars))
        tempattern = ''
        for c in pattern:
            if c in dicd:
                tempattern += dicd[c]
            else:
                tempattern += dicw[c]
        self.pattern = tempattern
        # shuffle rows
        random.shuffle(i1)
        random.shuffle(i2)
        random.shuffle(i3)
        rows = sum((i1, i2, i3), [])
        self.pattern = ''.join([self.pattern[i*9:i*9+9] for i in rows])
        # shuffle cols
        random.shuffle(i1)
        random.shuffle(i2)
        random.shuffle(i3)
        cols = sum((i1, i2, i3), [])
        self.pattern = ''.join([self.pattern[i*9:i*9+9][j] for i in range(9) for j in cols])
        # shuffle brows
        random.shuffle(i1)
        self.pattern = ''.join([self.pattern[i*3*9:i*3*9+27] for i in i1])
        # shuffle bcols
        random.shuffle(i1)
        self.pattern = ''.join([self.pattern[i*9:i*9+9][j*3:j*3+3] for i in range(9) for j in i1])
        # rotate left | none | right
        rotate = random.randint(-1, 1)
        if rotate == 0:
            pass
        elif rotate == -1:
            self.pattern = ''.join([self.pattern[i*9+j] for j in range(8, -1, -1) for i in range(9)])
        else:
            self.pattern = ''.join([self.pattern[i*9+j] for j in range(9) for i in range(8, -1, -1)])

    def generate(self):
        self.shuffle()
        sudoku = re.sub(r'[A-Z]', ' ', self.pattern)
        solve = self.pattern
        dicn = dict(zip(list('ABCDEFGHI'), list('123456789')))
        for c in dicn:
            solve = solve.replace(c, dicn[c])
        return sudoku, solve


