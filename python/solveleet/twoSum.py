class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        length = len(nums)
        for i in range(length):
            for j in range(i, length):
                if nums[i] + nums[j] == target:
                    return[i, j]
    def twoSum2(self, nums, target):
        from itertools import combinations
        for perm in combinations(nums, 2):
            if sum(perm) == target:
                i = nums.index(perm[0])
                j = nums.index(perm[1])
                return [i, j]
    def twoSum3(self, nums, target):
        """
        Use dict
        """
        length = len(nums)
        dic = {nums[i]:i for i in range(length)}
        for j in range(length):
            other = target - nums[j]
            if other in dic and dic[other] != j:
                return [j, dic[other]]
        return -1