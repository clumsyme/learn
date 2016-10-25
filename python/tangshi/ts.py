import json

ts = {}
with open('tangshi.txt', 'r') as fp:
    tslines = fp.readlines()
def update():
    length = len(tslines)
    i = 0
    while i<length:
        if '：' in tslines[i]:
            line = tslines[i].split('：')
            print(tslines[i])
            author = line[0][3:]
            title = line[1][:-1]
            article = []
            i += 1
            while i<length and '：' not in tslines[i]:
                if tslines[i] == '\n':
                    i += 1
                else:
                    sentences = tslines[i].split('，')
                    for sentence in sentences:
                        article.append(sentence)
                    i += 1
            if author not in ts.keys():
                ts.update({author:[{title:article}]})
            else:
                ts[author].append({title:article})
            print('updated', i)
        else:
            i += 1
update()
with open('ts.json', 'w', encoding='utf8') as tsjson:
    json.dump(ts, tsjson, ensure_ascii=False, indent=2)

