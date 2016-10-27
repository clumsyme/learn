from heapq import heapify, heappop, heappush

#Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None
    def lt(self, other):
        return self.val < other.val
    def eq(self, other):
        return self.val == other.val

class Solution(object):
    def mergeKLists(self, lists):
        """
        O(n)--> nklog(k)
        """
        if lists == []:
            return []
        r = c = ListNode(None)
        h = []
        heapify(h)
        for ln in lists:
            if ln != None:
                heappush(h, ln)
        while h:
            small = heappop(h)
            c.next = small
            c = c.next
            if small.next:
                heappush(h, small.next)
        return r.next