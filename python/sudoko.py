"""
Solve the sudoko which is a 3*3 matrix, the sum of each row and each column and diagonal 
of the matrix is 15. Function sudoko2 seems better for it only caculate the rows once. 
"""

from itertools import permutations

def sudoko():
    numbers = [1,2,3,4,5,6,7,8,9]
    pmNumbers = permutations(numbers)
    results = []
    for pmNumber in pmNumbers:
        matrix = [pmNumber[:3], pmNumber[3:6], pmNumber[6:]]
        if all(sum(row)==15 for row in matrix) and all(sum(col)==15 for col in zip(*matrix)) \
        and matrix[0][0]+matrix[1][1]+matrix[2][2]==matrix[0][2]+matrix[1][1]+matrix[2][0]==15:
            results.append(matrix)
    for result in results:
        for row in result:
            print(row)
        print('*'*20)

def sudoko2():
    numbers = [1,2,3,4,5,6,7,8,9]
    pmNumbers = permutations(numbers, 3)
    fifteens = [pmNumber for pmNumber in pmNumbers if sum(pmNumber)==15]
    preResults = permutations(fifteens, 3)
    results = []
    for preResult in preResults:
        if len(set(num for fifteen in preResult for num in fifteen)) == 9:
            if all(sum(col)==15 for col in zip(*preResult)) \
            and preResult[0][0]+preResult[1][1]+preResult[2][2]==preResult[0][2]+preResult[1][1]+preResult[2][0]==15:
                results.append(preResult)
    for result in results:
        for row in result:
            print(row)
        print('*'*20)
# sudoko()
# sudoko2()
# The time sudoko takes is 3 times of which sudoko2 takes.