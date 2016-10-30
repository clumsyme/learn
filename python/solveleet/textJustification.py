"""
Given an array of words and a length L, format the text such that each line has 
exactly L characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words 
as you can in each line. Pad extra spaces ' ' when necessary so that each line 
has exactly L characters.

Extra spaces between words should be distributed as evenly as possible. 
If the number of spaces on a line do not divide evenly between words, 
the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is 
inserted between words.

For example,
words: ["This", "is", "an", "example", "of", "text", "justification."]
L: 16.

Return the formatted lines as:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
"""

class Solution(object):
    def fullJustify(self, words, maxWidth):
        """
        :type words: List[str]
        :type maxWidth: int
        :rtype: List[str]
        """
        def create(b, e):
            thisword = ''
            space = maxWidth - width + c
            if c == 1:
                r.append(words[e-1]+' '*space)
                return
            if e == length:
                for k in range(b,e-1):
                    thisword += (words[k]+' ')
                thisword += words[e-1] + ' '*(space-c+1)
                r.append(thisword)
                return
            single = space // (c-1)
            count = space%(c-1)
            for k in range(b,b+count):
                thisword += (words[k] + ' '*(single+1))
            for k in range(b+count,e-1):
                thisword += (words[k] + ' '*single)
            thisword += words[e-1]
            r.append(thisword)
        length = len(words)
        i = j = c = 0
        width = 0
        r = []
        while i<length:
            if width + len(words[i]) > maxWidth:
                create(j, i)
                j = i
                c = 0
                width = 0
            else:
                width += len(words[i])+1
                c += 1
                i += 1
        if i == length:
            create(j, i)
        return r