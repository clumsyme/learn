class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        len1 = len(nums1)
        len2 = len(nums2)
        if (len1+len2) % 2:
            mid = (len1+len2) // 2
            i = j = 0
            temp = []
            while len(temp) <= mid:
                if j >= len2 or (i<len1 and nums1[i]<nums2[j]):
                    temp.append(nums1[i])
                    i += 1
                else:
                    temp.append(nums2[j])
                    j += 1
            return temp[-1]
        else:
            mid = (len1+len2) // 2
            i = j = 0
            temp = []
            while len(temp) <= mid:
                if j >= len2 or (i<len1 and nums1[i]<nums2[j]):
                    temp.append(nums1[i])
                    i += 1
                else:
                    temp.append(nums2[j])
                    j += 1
            return (temp[-1]+temp[-2]) / 2