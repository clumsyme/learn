def maxsum(array):
    maxsofar = maxsum = 0
    for i in array:
        maxsofar = max(maxsofar + i, 0)
        maxsum = max(maxsofar, maxsum)
    return maxsum


l = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84]

print(maxsum(l))
