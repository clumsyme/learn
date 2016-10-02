def code(string):
    binString = [bin(ord(c))[2:] for c in string]
    coded = [bString.replace('0', '-').replace('1', '*') \
        for bString in binString]
    return '+'.join(coded)

def decode(string):
    coded = string.split('+')
    binString = ['0b' + coded_.replace('-', '0').replace('*', '1')\
            for coded_ in coded]
    return ''.join([chr(int(bString, 2)) for bString in binString])

# print(code('且放白鹿青崖间'))
# *--***----*-*--+**--*-*--*****-+***-**--*****-*+*--****--*******+*--*-***-*-*--*-+*-***-*---*-**-+*--*-*-*****-*--
# print(decode(code('且放白鹿青崖间')))
# 且放白鹿青崖间