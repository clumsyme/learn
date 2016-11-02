import json
import time
import requests
from bs4 import BeautifulSoup as bs

class UserSpider:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0'}
    def __init__(self, userurl):
        self.userurl = userurl + '/answers?order_by=vote_num'
        self.answers = []
    def get_answers(self, url):
        pagenum = url.split('=')[-1]
        # if pagenum == '3': return
        print('scrawling page', pagenum)
        page = requests.get(url, headers=UserSpider.headers)
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

class TopicSpider:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0'}
    def __init__(self, topicurl):
        self.topicurl = topicurl + '/top-answers'
        self.answers = []
    def get_answers(self, url):
        pagenum = url.split('=')[-1]
        # if pagenum == '3': return
        print('scrawling page', pagenum)
        page = requests.get(url, headers=TopicSpider.headers)
        soup = bs(page.content, "html.parser")
        items = soup.find_all('div', class_='feed-main')
        for item in items:
            title = item.div.h2.a.string.strip()
            approval = item.find('a', class_='zm-item-vote-count').string
            try:
                author = item.find('a', class_='author-link').string
            except AttributeError:
                author = '匿名用户'
            try:
                answer = item.find('textarea').string
            except AttributeError:
                answer = '此答案被删除'
            self.answers.append({'title': title,
                                 'approval': approval,
                                 'author': author,
                                 'answer': answer
                                })
        nav = soup.find('div', class_='zm-invite-pager')
        nextspan = nav.findChildren()[-1]
        try:
            nexturl = nextspan['href']
        except KeyError:
            self.topicname = soup.title.string.strip().split(' ')[0]
            nexturl = False
        if nexturl:
            self.get_answers(self.topicurl + nexturl)
    def json_answers(self):
        with open(self.topicname+'.json', 'w', encoding='utf8') as file:
            json.dump(self.answers, file, indent=2, ensure_ascii=False)
    def run(self):
        self.get_answers(self.topicurl)
        self.json_answers()

if __name__ == '__main__':
    url = input('Url：')
    if 'people' in url:
        spider = UserSpider(url)
        spider.run()
    elif 'topic' in url:
        spider = TopicSpider(url)
        spider.run()