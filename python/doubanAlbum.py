"""
A crawler for crawing albums in douban.com. 
Just type the albumUrl or a person's albumlistUrl, or a celebrity's photosUrl using the following pattern：
    albumUrl: https://www.douban.com/photos/album/1234567/
    albumlistUrl: https://www.douban.com/people/1234567/photos
    celebrityUrl: https://movie.douban.com/celebrity/123456/photos/
Images will be saved in './albumName' for single-album-dowmload and in './people/albumName' 
for all-albums-download, and './celebrity/' for celebrity-download.
"""

import os
import time
import requests
from bs4 import BeautifulSoup as bs
from ly import goto

INTERVAL = 0.5
get = requests.get
post = requests.post
session = requests.Session()

def downloadAlbum(albumUrl):
    """Download a single album:
        dowmloadAlbum('https://www.douban.com/photos/album/123456789/')
    """
    album = get(albumUrl)
    soup = bs(album.text, "html.parser")
    albumName = soup.find('div', class_='info').h1.string.split('-')[-1]
    nextpage = soup.find('span', class_='next')
    thumbs = soup.find_all('a', class_='photolst_photo')
    imgUrls = [a.img['src'].replace('thumb', 'large')
                for a in thumbs]
    with goto(albumName):
        for img in imgUrls:
            imgName = img.split('/')[-1]
            with open(imgName, 'wb') as imgdate:
                imgdate.write(get(img).content)
                time.sleep(INTERVAL)
    if nextpage and nextpage.a:
        downloadAlbum(nextpage.a['href'])

def downloadAllAlbums(albumsUrl):
    """Download all albums of a person, the albumsUrl is the url of a person's albumlist.
        downloadAllAlbums('https://www.douban.com/people/abcde/photos')
    """
    allAlbums = get(albumsUrl)
    soup = bs(allAlbums.text, "html.parser")
    people = soup.find('div', class_='info').h1.string
    nextpage = soup.find('span', class_='next')
    albums = soup.find_all('a', class_='album_photo')
    albumUrls = [album['href'] for album in albums]
    with goto(people):
        for albumUrl in albumUrls:
            downloadAlbum(albumUrl)
    if nextpage and nextpage.a:
        downloadAllAlbums(nextpage.a['href'])

def downloadCelebrity(celebrityUrl):
    """Download a celebrity's photos, the celebrityUrl is the celebrity's 'allphoto'
        downloadCelebrity('https://movie.douban.com/celebrity/:celebrityID/photos/')
    """
    celebrity = get(celebrityUrl).text
    soup = bs(celebrity, "html.parser")
    celebrityName = "影人" + soup.find('div', id='content').h1.string.split(' ')[0]
    nextpage = soup.find('span', class_='next')
    photodivs = soup.find_all('div', class_='cover')
    photos = [(div.a['href'], div.a.img['src']) for div in photodivs]
    with goto(celebrityName):
        for photo in photos:
            photoName = photo[1].split('/')[-1]
            with open(photoName, 'wb') as photodata:
                rawphoto = photo[1].replace('thumb', 'raw')
                photodata.write(get(rawphoto, headers={'referer':photo[0]}).content)
                time.sleep(INTERVAL)
    if nextpage and nextpage.a:
        downloadCelebrity(nextpage.a['href'])

def login(email, password):
    """
    Login to douban.com with email&password, redirect to profile in default.
    """
    loginUrl = "https://www.douban.com/accounts/login"
    loginUrl2 = "https://accounts.douban.com/login"
    headers = {
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer':'https://www.douban.com/mine'
    }
    data = {
        'source': 'index_nav',
        'form_email': email,
        'form_password': password,
        'remember': 'on'
    }
    loggedIn = session.post(loginUrl, headers=headers, data=data)
    soup = bs(loggedIn.text, "html.parser")
    if soup.title == "登录豆瓣":
        input('Need captcha.\nPress Enter to read capcha:')
        os.startfile('验证码.jpg')
        captchaImg = soup.find('img', class_='captcha_image')['src']
        captchaID = captchaImg.split('=')[-2].split('&')[-2]
        with open('验证码.jpg', 'wb') as capt:
            capt.write(get(captchaImg).content)    
        captcha = input('Input captcha: ')
        captchaData = {'captcha-solution': captcha, 'captcha-id': captchaID}
        data.update(captchaData)
        loggedIn = session.post(loginUrl2, headers=headers, data=data)
        # with open('cookies.txt', 'w') as capt:
        #     capt.write(str(dict(loggedIn.cookies)))
        return loggedIn

if __name__ == "__main__":
    url = input("Url: ")
    if 'people' in url:
        downloadAllAlbums(url)
    elif 'celebrity' in url:
        downloadCelebrity(url)
    else:
        downloadAlbum(url)


############################### OTHER CHOICES ###################################
"""
Using douban API.
def download(albumID):
    album = get('https://api.douban.com/v2/album/{}/photos'.format(albumID)).text
    albumobj = json.loads(album)
    photos = albumobj['photos']
    title = albumobj['album']['title']
    srcs = [photo['large'] for photo in photos]
    with goto(title):
        for src in srcs:
            name = src.split('/')[-1]
            with open(name, 'wb') as file:
                file.write(get(src).content)
"""