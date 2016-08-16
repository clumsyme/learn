# I thought I should write the code like this if I want to filter the prime num use for loop.

for i in range(2, 100):
    is_prime = True
    for j in range(2, i):
        if i%j == 0:
            is_prime = False
            print("{} = {}*{}".format(i, j, i/j))
            break
    if is_prime:
        print(i, "is a prime number.")
    
# I thought I should make a flag to determain whether a j is found for i%j == 0.
# In fact:
#       Loop statements may have an else clause; it is executed when the loop terminates through 
#       exhaustion of the list (with for) or when the condition becomes false (with while), 
#       but not when the loop is terminated by a break statement. *
#       * https://docs.python.org/3/tutorial/controlflow.html
# That means, the else clause will always executed when the loop is over, but not when the loop 
# is breaked.So here's a simple way, without a is_prime.
for i in range(2, 100):
    for j in range(2, i):
        if i%j == 0:
            print("{} = {}*{}".format(i, j, i/j))
            break
    else:
        print(i, "is a prime number.")
