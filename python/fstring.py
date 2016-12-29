# A new way for formatting string is added in python3.6

>>> name = "Tom"
>>> age = 3
>>> f"It's name is {name} and it's {age} years old."
"It's name is Tom and it's 3 years old."

# It supports full python expressions

>>> friends = ['Tom', "Jerry", "Micky"]
>>> tom = {"name": "Tom", "age": 3}
>>> f"The {len(friends)} friends are {friends[0]}, {friends[1]} and {friends[2]}."
'The 3 friends are Tom, Jerry and Micky.'
>>> f"It's name is {tom['name']} and it's {tom['age']} years old."
"It's name is Tom and it's 3 years old."
>>> def say(): return "Hello"
>>> f"He said {say()}."
'He said Hello.'

# No backslash is allowed in '{}'

>>> f"{\"hello\"}"
SyntaxError: f-string expression part cannot include a backslash

# To include literal brace:

>>> f"{{ {10*8} }}"
'{ 80 }'

# Combine with raw-string

>>> fr"hello\n{name}"
'hello\\nTom'

Note that u'' is used for compatibility with Python 2.7,cause python2.7 will never support f-strings, using fu'' has no effect.

>>> fu"Hello {name}."
SyntaxError: invalid syntax

# string formatting is supported

>>> def p():
    print(f"{'index':^10}{'name':^20}")
    for i in range(3):
        print(f"{i:^10}{friends[i]:^20}")
>>> p()
  index           name        
    0             Tom         
    1            Jerry        
    2            Micky 
>>> PI = 3.141592653
>>> f"{PI:.2f}"
3.14