import os
import sys
import json

with open('ts.json', 'r', encoding='utf8') as fp:
    ts = json.load(fp)
print(ts.keys())

def create(sentence, nextsentence):
    cate =  '''\n<category>
<pattern>{0}</pattern>
<template>
{1}
</template>
</category>
'''.format(sentence, nextsentence)
    return cate


with open('sentence.aiml', 'a', encoding='utf8') as tsa:
    for author in ts:
        for article in ts[author]:
            sentences = list(article.values())[0]
            length = len(sentences)
            for i in range(length-1):
                tsa.write(create(sentences[i], sentences[i+1]))
    tsa.write('''</aiml>''')


