import json
import re
import copy
import time
import random
import requests
from bs4 import BeautifulSoup as bs

pattern = re.compile(r'tag\/(.*?)\?type')
pattern2 = re.compile(r'\((.*?)人评价\)')
get = requests.get
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
                    AppleWebKit/537.36 (KHTML, like Gecko), Chrome/54.0.2840.59 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Referer': 'https://movie.douban.com/tag/'
    }
rootUrl = 'https://movie.douban.com/tag/'
baseUrl = 'https://movie.douban.com'

def getTagsUrls(category):
    rootPage = get(rootUrl)
    rootSoup = bs(rootPage.text, 'html.parser')
    tagsTable = rootSoup.find('a', attrs={'name':category}).next_sibling.next_sibling
    tags = [tag.a['href'] for row in list(tagsTable.tbody.children) for tag in row if tag != '\n']
    tagsUrls = [baseUrl+tag for tag in tags]
    return tagsUrls

movies = []
def getMovies(tagUrl):
    tagPage = get(tagUrl, headers=headers)
    tagSoup = bs(tagPage.text, 'html.parser')
    items = tagSoup.find_all('tr', class_='item')
    nextpage = tagSoup.find('span', class_='next')
    for item in items:
        name = list(item.find('a', class_='').children)[0]
        name = name.replace('\n', '').replace(' ', '').replace('/', '')
        rating = item.find('span', class_='rating_nums')
        if rating:
            rating = float(rating.string)
        else:
            rating = 0.0
        rated = item.find('span', class_='pl')
        rated = re.findall(pattern2, rated.string)
        if rated and rated[0] != '目前无':
            rated = int(rated[0])
        else:
            rated = 0
        movie = {'名称': name, '评分': rating, '人数': rated}
        movies.append(movie)
    print('    ', len(movies), '个已爬取')
    time.sleep(1)
    if nextpage and nextpage.a:
        getMovies(nextpage.a['href'])

def getTagMovies(tagUrl):
    tag = re.findall(pattern, tagUrl)[0]
    print('正在爬取类别：', tag)    
    getMovies(tagUrl)
    copyMovies = copy.deepcopy(movies)
    movies.clear()
    return {tag : copyMovies}

if __name__ == '__main__':
    allTags = {}
    category = input('分类标准：')
    tagsUrls = getTagsUrls(category)
    for tagUrl in tagsUrls:
        allTags.update(getTagMovies(tagUrl))
    with open('doubanMovie.json', 'w', encoding='utf8') as dbm:
        json.dump(allTags, dbm, indent=2, ensure_ascii=False)