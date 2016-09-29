"""
A crawler for crawing albums in douban.com. 
If input("Single(S/s) or Multi(M/m): ") gets 'S/s', downloadAlbum will be invoked to download a single album, 
if gets 'M/m', downloadAllAlbums will be invoked to download all albums of a people.
Images will be saved in './people/albumName' for multi-download and in './albumName' for single-dowmload.
"""

import time
import requests
from bs4 import BeautifulSoup as bs
from ly import goto

INTERVAL = 0.5
get = requests.get
def downloadAlbum(albumUrl):
    """Download a single album:
        dowmloadAlbum('https://www.douban.com/photos/album/123456789/')
    """
    album = get(albumUrl)
    soup = bs(album.text, "html.parser")
    albumName = soup.find('div', class_='info').h1.string.split('-')[-1]
    nextpage = soup.find('span', class_='next')
    thumbs = soup.find_all('a', class_='photolst_photo')
    imgUrls = [a.img['src'].replace('thumb','photo')
                for a in thumbs]
    with goto(albumName):
        for img in imgUrls:
            imgName = img.split('/')[-1]
            with open(imgName, 'wb') as imgdate:
                imgdate.write(get(img).content)
                time.sleep(INTERVAL)
    if nextpage.a:
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
        if nextpage.a:
            downloadAllAlbums(nextpage.a['href'])

if __name__ == "__main__":
    single = input("Single(S/s) or Multi(M/m): ")
    while single not in ['S', 's', 'M', 'm']:
        single = input("Single(S/s) or Multi(M/m)")
    url = input("Url: ")
    if single in ['S', 's']:
        downloadAlbum(url)
    else:
        downloadAllAlbums(url)