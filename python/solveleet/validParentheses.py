"""
Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
 determine if the input string is valid.

The brackets must close in the correct order, 
"()" and "()[]{}" are all valid but "(]" and "([)]" are not.
"""
class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        while True:
            r = s.replace('()', '').replace('[]', '').replace('{}', '')
            if r == '':
                return True
            elif r == s:
                return False
            else:
                s = r
    def isValid2(self, s):
        """
        Using stack.
        """
        pair = {'(': ')', '[': ']', '{': '}'}
        stack = []
        for p in s:
            if p in pair:
                stack.append(p)
            else:
                if not stack:
                    return False
                if p != pair[stack.pop()]:
                    return False
        return not stack
        