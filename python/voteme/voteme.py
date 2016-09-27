import os
import sqlite3

from flask import Flask, request, session, g, redirect, \
            url_for, abort, render_template, flash

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'polls.db'),
    SECRET_KEY='development key',
    USERNAME='yan',
    PASSWORD='letmein'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')

@app.route('/')
def index():
    db = get_db()
    cur = db.execute('select * from polls order by id desc')
    polls = cur.fetchall()
    return render_template('index.html', polls=polls)

@app.route('/add',methods=['POST'])
def add_poll():
    db = get_db()
    db.execute('insert into polls (title, option1, option2, option3) values (?, ?, ?, ?)',
                 [request.form['title'], request.form['option1'], request.form['option2'], request.form['option3']])
    db.commit()
    flash('New poll was successfully posted')
    return redirect(url_for('index'))

@app.route('/poll/<title>')
def show_poll(title):
    db = get_db()
    polldb = db.execute("select title, option1, option2, option3 from polls WHERE title=?", [title])
    poll = polldb.fetchall()[0]
    return render_template('poll.html', poll=poll)

@app.route('/update/<title>',methods=['POST'])
def update_poll(title):
    db = get_db()
    db.execute('update polls set num1=num1+1 where title=?',[title])
    db.commit()
    flash('New poll was successfully posted')
    return redirect(url_for('index'))

@app.route('/poll/result/<title>')
def show_result(title):
    db = get_db()
    polldb = db.execute("select * from polls WHERE title=?", [title])
    poll = polldb.fetchall()[0]
    return render_template('result.html', poll=poll)


if __name__ == "__main__":
    app.run(host='0.0.0.0')