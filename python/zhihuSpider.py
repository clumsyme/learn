import sys
import json
import time
import requests
from bs4 import BeautifulSoup as bs

try:
    order = sys.argv[1]
except IndexError:
    order = '/answers'
if order == '-n':
    order = '/answers?order_by=vote_num'

class ZhihuSpider:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0'}
    def __init__(self, userurl):
        self.userurl = userurl + order
        self.answers = []
    def get_answers(self, url):
        pagenum = url.split('=')[-1]
        # if pagenum == '3': return
        print('scrawling page', pagenum)
        page = requests.get(url, headers=ZhihuSpider.headers)
        soup = bs(page.content, "html.parser")
        items = soup.find_all('div', class_='zm-item')
        for item in items:
            title = item.h2.a.string.strip()
            try:
                answer = item.find('textarea').string
            except AttributeError:
                answer = '此答案被删除'
            self.answers.append({title: answer})
        nav = soup.find('div', class_='border-pager')
        nextspan = nav.div.findChildren()[-1]
        try:
            nexturl = nextspan['href']
        except KeyError:
            self.username = soup.title.string.strip().split(' ')[0]
            nexturl = False
        if nexturl:
            self.get_answers(self.userurl + nexturl)
    def json_answers(self):
        with open(self.username+'.json', 'w', encoding='utf8') as file:
            json.dump(self.answers, file, indent=2, ensure_ascii=False)
    def run(self):
        self.get_answers(self.userurl)
        self.json_answers()

if __name__ == '__main__':
    userurl = input('用户Url：')
    spider = ZhihuSpider(userurl)
    spider.run()