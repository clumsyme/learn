strA = 'Hello world. How are you?'
strB = 'Haloo walde? Hou aie yuu!'
diff = ''.join(['* '[a==b] for a,b in zip(strA, strB)])
print('\n'.join([strA, strB, diff]))
>>>
# Hello world. How are you?
# Haloo walde? Hou aie yuu!
#  | |   |||||   |  |   | |
