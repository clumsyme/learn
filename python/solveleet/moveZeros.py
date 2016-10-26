'''
Given an array nums, write a function to move all 0's to the end of it 
while maintaining the relative order of the non-zero elements.

For example, given nums = [0, 1, 0, 3, 12], 
after calling your function, nums should be [1, 3, 12, 0, 0].
'''
def moveZeroes(nums):
        """
        """
        length = len(nums)
        j = 0
        for i in range(length):
            if nums[i] != 0:
                nums[j] = nums[i]
                j += 1
        for i in range(j, length):
            nums[i] = 0