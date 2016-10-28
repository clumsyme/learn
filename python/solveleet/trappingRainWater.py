"""
Given n non-negative integers representing an elevation map 
where the width of each bar is 1, compute how much water 
it is able to trap after raining.

For example, 
Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.
"""
class Solution(object):
    def trap(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        if not height:
            return 0
        maxnum = max(height)
        center = height.index(maxnum)
        i0 = 0
        j0 = len(height) - 1
        i1 = i0 + 1
        j1 = j0 - 1
        left = right = 0
        while i0 < center:
            delta = height[i0] - height[i1]
            if delta > 0:
                left += delta
                i1 += 1
            else:
                i0 = i1
                i1 += 1
        while j0 > center:
            delta2 = height[j0] - height[j1]
            if delta2 > 0:
                right += delta2
                j1 -= 1
            else:
                j0 = j1
                j1 -= 1
        return left + right