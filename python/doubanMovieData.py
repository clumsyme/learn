import json
import mysql.connector

with open('doubanMovies.json', 'r', encoding='utf8') as dbms:
    dic = json.load(dbms)

db = mysql.connector.connect(user='****', password='*******',database='****')
cursor = db.cursor()
cursor.execute("""create table doubanmovie
                   (id int auto_increment,
                   name tinytext null,
                   rating float null,
                   rated int null, 
                   tag varchar(15),
                   primary key (id))""")

addMovie = """insert into doubanmovies 
            (name, rating, rated, tag) 
            values (%s, %s, %s, %s)"""

for tag in dic.keys():
    for movie in dic[tag]:
        try:
            cursor.execute(addMovie, (movie["名称"], movie["评分"], movie["人数"], tag))
        except TypeError:
            cursor.execute(addMovie, (movie["名称"], movie["评分"], 0, tag))
db.commit()