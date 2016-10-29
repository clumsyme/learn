"""
Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

For example:
A = [2,3,1,1,4], return true.

A = [3,2,1,0,4], return false.
"""
class Solution(object):
    def canJump(self, nums):
        """
        This one is good.
        If step == 0 means we can reach the farthest to here, and if it's 0 we can never get the end,
        unless it's already the end(that's why we don't check nums[-1]).
        :type nums: List[int]
        :rtype: bool
        """
        step = 1
        for n in nums[:-1]:
            step -= 1
            if not n and step == 0:
                return False
            step = max(n, step)
        return True