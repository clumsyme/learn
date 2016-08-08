# How does 'sorted' function works:
# When we use 

sorted(arr, key=calc_value)

# it actually apply calc_value(item) for each item in arr,
# then return a value for the item.
# After all the items are calculated, sort the items by values.
# i.e.

li = ['tb', 'bc', 'asc', 'cfb', 'ade', 'rac']

# we want the strings in li sorted based on the second character
# but not the first, we can define a function:

def calc_value(string):
    return ord(string[1])
sorted_li = sorted(li, key = calc_value)

print(sorted_li)
# ['rac', 'tb', 'bc', 'ade', 'cfb', 'asc']

# the sorted function has a default-parameter 'reverse=False' can be 
# set to request the result in descending order.