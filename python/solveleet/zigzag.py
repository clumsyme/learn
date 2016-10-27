"""
The string "PAYPALISHIRING" is written in a zigzag pattern on a given 
number of rows like this: (you may want to display this pattern in a 
fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"
"""
class Solution(object):
    def convert(self, s, numRows):
        """
        just a 'r' extra space.
        """
        if numRows == 1:
            return s
        length = len(s)
        r = ''
        n = 2*(numRows-1)
        r += s[::n]
        for i in range(1, numRows-1):
            j = i
            while j < length:
                r += s[j]
                j += n-(i)*2
                if j < length:
                    r += s[j]
                    j += (i)*2
        r += s[numRows-1::n]
        return r
    def convert(self, s, numRows):
        """
        simple to understand, needs 'numRows' extra list.
        """
        j = 0
        for c in s:
            l[j].append(c)
            if j == numRows-1:
                i = -1
            if j == 0:
                i = 1
            j += i
        return ''.join([''.join(li) for li in l])
