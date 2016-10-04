class Heap:
    def __init__(self, values=None):
        self.nodes = [0]
        if values != None:
            for value in values:
                self.insert(value)
    @property
    def size(self):
        return len(self.nodes)-1
    def findMin(self):
        return self.nodes[1]
    def insert(self, newValue):
        self.nodes.append(newValue)
        i = self.size
        while self.nodes[i] < self.nodes[i//2]:
            self.nodes[i], self.nodes[i//2] = self.nodes[i//2], self.nodes[i]
            i = i//2
    def deleteMin(self):
        i = 1
        last = self.nodes[self.size]
        while 2*i <= self.size:
            if 2*i+1 <= self.size:
                smaller = 2*i if self.nodes[2*i]<self.nodes[2*i+1] else 2*i+1
            else:
                smaller = 2*i
            if self.nodes[smaller] < last:
                self.nodes[i], self.nodes[smaller] = self.nodes[smaller], self.nodes[i]
                i = smaller
            else:
                break
        self.nodes[i], self.nodes[self.size] = last, self.nodes[i]
        return self.nodes.pop()

import random
h = Heap()
for i in range(15):
    h.insert(random.randint(1,1000))
    print(h.nodes)
h.deleteMin()
print('-'*50, h.nodes, sep='\n')

unordered = [random.randint(1,1000) for _ in range(20)]
heap = Heap(unordered)
ordered = [heap.deleteMin() for _ in range(heap.size)]
print('unordered: ', unordered)
print('ordered: ', ordered)

# [0, 328]
# [0, 80, 328]
# [0, 80, 328, 343]
# [0, 80, 328, 343, 920]
# [0, 80, 328, 343, 920, 896]
# [0, 80, 328, 285, 920, 896, 343]
# [0, 80, 328, 285, 920, 896, 343, 383]
# [0, 80, 328, 285, 730, 896, 343, 383, 920]
# [0, 80, 203, 285, 328, 896, 343, 383, 920, 730]
# [0, 80, 203, 285, 328, 715, 343, 383, 920, 730, 896]
# [0, 80, 203, 285, 328, 300, 343, 383, 920, 730, 896, 715]
# [0, 80, 203, 285, 328, 300, 343, 383, 920, 730, 896, 715, 769]
# [0, 80, 203, 285, 328, 300, 343, 383, 920, 730, 896, 715, 769, 615]
# [0, 80, 203, 285, 328, 300, 343, 383, 920, 730, 896, 715, 769, 615, 927]
# [0, 80, 203, 285, 328, 300, 343, 383, 920, 730, 896, 715, 769, 615, 927, 986]
# --------------------------------------------------
# [0, 203, 300, 285, 328, 715, 343, 383, 920, 730, 896, 986, 769, 615, 927]
# unordered:  [215, 934, 428, 140, 804, 20, 405, 289, 977, 989, 503, 248, 749, 12, 561, 944, 178, 970, 530, 741]
# ordered:  [12, 20, 140, 178, 215, 248, 289, 405, 428, 503, 530, 561, 741, 749, 804, 934, 944, 970, 977, 989]

"""
All above can be done with the heapq built-in module.

import heapq
unordered = [random.randint(1,1000) for _ in range(20)]
heapq.heapify(unordered)
ordered = [heapq.heappop(unordered) for _ in range(len(heap))]

unordered is changed into a heap in-place.
"""

class HeapMax:
    """Another heap for looking for max value."""
    def __init__(self, values):
        self.nodes = [10**20]
        if values != None:
            for value in values:
                self.insert(value)
    @property
    def size(self):
        return len(self.nodes)-1
    def findMax(self):
        return self.nodes[1]
    def insert(self, newValue):
        self.nodes.append(newValue)
        i = self.size
        while self.nodes[i] > self.nodes[i//2]:
            self.nodes[i], self.nodes[i//2] = self.nodes[i//2], self.nodes[i]
            i = i//2
    def deleteMax(self):
        i = 1
        last = self.nodes[self.size]
        while 2*i <= self.size:
            if 2*i+1 <= self.size:
                bigger = 2*i if self.nodes[2*i]>self.nodes[2*i+1] else 2*i+1
            else:
                bigger = 2*i
            if self.nodes[bigger] > last:
                self.nodes[i], self.nodes[bigger] = self.nodes[bigger], self.nodes[i]
                i = bigger
            else:
                break
        self.nodes[i], self.nodes[self.size] = last, self.nodes[i]
        return self.nodes.pop()

