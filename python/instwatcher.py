"""
Look at a instagram user's profile to see if they've 
updated new picutres, if so, send the picture as an 
attachment to a email address.
Scan the page every {INTERVAL} seconds.

KNOWN ISSUES: Not every content has caption.
"""

import re
import time
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.header import Header
import requests
from bs4 import BeautifulSoup as bs

logging.basicConfig(filename='inslogging.log', format='%(asctime)s---%(message)s \n', level=logging.INFO)

INTERVAL = 600
smtpserver = 'smtp.qq.com'
username = '***@qq.com'
password = '***'

from_addr = '***@qq.com'
to_addr = ['***@qq.com']

userurl = 'https://www.instagram.com/sophiet/'
pattern1 = re.compile(r'"caption": "(.*?)"')
pattern2 = re.compile(r'"display_src": "(.*?)"')
lastimg = ''

def sendmail(cap, imgcontent):
    message = MIMEMultipart()
    message['From'] = Header("Spider", 'utf-8')
    message['To'] = Header("The One", 'utf-8')
    subject = '有新图片更新'
    message['Subject'] = Header(subject, 'utf-8')
    message.attach(MIMEText('在附件里', 'plain', 'utf-8'))
    img = MIMEImage(imgcontent, _subtype="jpeg")
    img.add_header('Content-Disposition', 'attachment', filename=cap)
    message.attach(img)

    sm = smtplib.SMTP(smtpserver, port=587)
    #sm.set_debuglevel(1)
    sm.ehlo()
    sm.starttls()
    sm.ehlo()
    sm.login(username, password)

    sm.sendmail(from_addr, to_addr, message.as_string())
    time.sleep(5)
    sm.quit()

def main():
    global lastimg
    userpage = requests.get(userurl, 'html.parser').text
    captions = re.findall(pattern1, userpage)
    imgs = re.findall(pattern2, userpage)
    imgs = [img.split('?')[0] for img in imgs]
    for i in range(12):
        if imgs[i] == lastimg:
            lastimg = imgs[0]
            break
        else:
            cap = (captions[i]+'.jpg').replace(' ', '.')
            imgcontent = requests.get(imgs[i]).content
            #sendmail(cap, imgcontent)
            logging.info('Mailing image %s', cap)
    time.sleep(INTERVAL)
while True:
    try:
        main()
    except Exception as e:
        logging.warning(e)
        time.sleep(60)
        continue
    time.sleep(INTERVAL)
