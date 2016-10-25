import os
import sys
import json



with open('ts.json', 'r', encoding='utf8') as fp:
    ts = json.load(fp)
print(ts.keys())

def create(asking, response):
    return '''<category>
<pattern>{0}</pattern>
<template>
            {1}
        </template>
    </category>
    </aiml>'''.format(asking, response)

def createauthor(author):
    cate =  '''\n<category>
<pattern>{0}</pattern>
<template>
<random>
'''.format(author)
    for article in ts[author]:
        for title in article:
            cate += '<li>\n' + title + '\n' + '\n\n'.join(article[title]) + '\n</li>\n'
    cate += '''</random>
</template>
</category>'''
    return cate

with open('author.aiml', 'a', encoding='utf8') as tsa:
    for author in ts:
        tsa.write(createauthor(author))
    tsa.write('''</aiml>''')


