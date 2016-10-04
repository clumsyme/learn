class Heap:
    def __init__(self, *values):
        self.nodes = [0]
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
            smaller = 2*i if self.nodes[2*i]<self.nodes[2*i+1] else 2*i+1
            if self.nodes[smaller] < last:
                self.nodes[i], self.nodes[smaller] = self.nodes[smaller], self.nodes[i]
                i = smaller
            else:
                break
        self.nodes[i] = last
        self.nodes.pop()

import random
h = Heap()
for i in range(15):
    h.insert(random.randint(1,1000))
    print(h.nodes)
h.deleteMin()
print('-'*50, h.nodes, sep='\n')
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
