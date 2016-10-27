"""
Given n non-negative integers a1, a2, ..., an, where each represents a point 
at coordinate (i, ai). n vertical lines are drawn such that the two 
endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together 
with x-axis forms a container, such that the container contains the most water.
"""
from heapq import heapify, heappop
from collections import deque
class Solution(object):
    def maxArea(self, height):
        """
        A bad complex one.
        This works for no-duplicate height, while costs lots of extra space.
        """
        length = len(height)
        deq = deque(range(1, length+1))
        dic = {height[i]:i+1 for i in range(length)}
        heapify(height)
        maxarea = 0
        while height:
            ch = heappop(height)
            area = max(ch*(dic[ch]-deq[0]), ch*(deq[-1]-dic[ch]))
            if area > maxarea:
                maxarea = area
            deq.remove(dic[ch])
        return maxarea
    def maxArea2(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        length = len(height)
        i = 0
        j = length-1
        maxarea = 0
        while i<j:
            carea = min(height[i], height[j])* (j-i) 
            if carea > maxarea:
                maxarea = carea
            if height[i] > height[j]:
                j -= 1
            else:
                i += 1
        return maxarea