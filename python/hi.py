import requests
import jieba
from bs4 import BeautifulSoup as bs

class Dog(object):
    def __init__(self, name):
        self.name = name
    def bark(self):
        print("I'm {}, Wang!".format(self.name))

a = Dog('Tommy')
a.bark()
print(a.name)

def power(base,n):
    p = 1
    for _ in range(n):
        p *= base
    return p
for j in range(1,11):
    print("2^{0}={1} and 3^{0}={2}".format(j, pow(2,j), pow(-3,j)))

douban = requests.get("https://www.douban.com")
soup = bs(douban.text, "html.parser")
string = "返回结果是{0}".format(str(soup.title))
cutted = jieba.cut(string)
for w in cutted:
   print(w)