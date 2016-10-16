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
rootUrl = 'https://movie.douban.com/tag/'
baseUrl = 'https://movie.douban.com'

class Spider:
    def __init__(self, cate):
        self.cate = cate
        self.tagMovies = {}
    def getTagsUrls(self):
        rootPage = get(rootUrl)
        rootSoup = bs(rootPage.text, 'html.parser')
        tagsTable = rootSoup.find('a', attrs={'name':self.cate}).next_sibling.next_sibling
        tags = [tag.a['href'] for row in list(tagsTable.tbody.children) for tag in row if tag != '\n']
        self.tagsUrls = [baseUrl+tag for tag in tags]
    def getMovies(self, tagUrl):
        tagPage = get(tagUrl)
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
            self.movies.append(movie)
        print('    ', len(self.movies), '个已爬取')
        time.sleep(1)
        if nextpage and nextpage.a:
            self.getMovies(nextpage.a['href'])
    def getTagMovies(self, tagUrl):
        self.movies = []
        tag = tagUrl.split('/')[-1]
        print('正在爬取类别：', tag)    
        self.getMovies(tagUrl)
        copyMovies = copy.deepcopy(self.movies)
        self.movies.clear()
        return {tag : copyMovies}
    def crawling(self):
        self.getTagsUrls()
        for tagUrl in self.tagsUrls:
            self.tagMovies.update(self.getTagMovies(tagUrl))
        with open(self.cate+'.json', 'w', encoding='utf8') as dbm:
            json.dump(self.tagMovies, dbm, indent=2, ensure_ascii=False)

spider = Spider('类型')
spider.crawling()