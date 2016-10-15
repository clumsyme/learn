import json
import re
import requests
from bs4 import BeautifulSoup as bs

pattern = re.compile(r'tag\/(.*?)\?type')
get = requests.get

rootUrl = 'https://movie.douban.com/tag/'
baseUrl = 'https://movie.douban.com'

rootPage = get(rootUrl)
rootSoup = bs(rootPage.text, 'html.parser')
tagsTable = rootSoup.find('a', attrs={'name':'类型'}).next_sibling.next_sibling
tags = [tag.a['href'] for row in list(tagsTable.tbody.children) for tag in row if tag != '\n']
tagsUrls = [baseUrl+tag+'?type=S' for tag in tags]
print(tagsUrls)

def getTagMovies(tagUrl):
    tag = re.findall(pattern, tagUrl)[0]
    print('正在爬取类别：', tag)
    movies = []
    def getMovies(tagUrl):
        tagPage = get(tagUrl)
        tagSoup = bs(tagPage.text, 'html.parser')
        items = tagSoup.find_all('tr', class_='item')
        nextpage = tagSoup.find('span', class_='next')
        for item in items:
            name = list(item.find('a', class_='').children)[0]
            name = name.replace('\n', '').replace(' ', '')
            rating = item.find('span', class_='rating_nums').string
            rated = item.find('span', class_='pl').string
            movie = {'名称': name, '评分': rating, '人数': rated}
            movies.append(movie)
        if nextpage and nextpage.a:
            getMovies(nextpage.a['href'])
    getMovies(tagUrl)
    return {tag : movies}

allTags = {}
for tagUrl in tagsUrls:
    allTags.update(getTagMovies(tagUrl))
with open('doubanMovie.json', 'w', encoding='utf8') as dbm:
    json.dump(allTags, dbm, indent=2, ensure_ascii=False)