"""
You are given two linked lists representing two non-negative numbers. 
The digits are stored in reverse order and each of their nodes 
contain a single digit. Add the two numbers and return it as a linked list.

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
"""
# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution(object):
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        l3 = ListNode(None)
        l = l3
        jinwei = 0
        while l1 or l2:
            lv1 = l1.val if l1 else 0
            lv2 = l2.val if l2 else 0
            val = lv1 + lv2 + jinwei
            jinwei = val/10
            val = val%10
            l3.next = ListNode(val)
            l3 = l3.next
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next
        if jinwei:
            l3.next = ListNode(1)
        return l.next