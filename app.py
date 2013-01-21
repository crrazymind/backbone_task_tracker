import bottle
import pymongo
import cgi
import re
import datetime
import random
import hmac
import user
import json
import sys
import os
import ast
from itertools import izip
from bottle import get, post, request, response, put, route, static_file, run
from bson import BSON, json_util
from bson.objectid import ObjectId
from jadeview import jade_view as view, jade_template as jtemplate
from rest import BackBoneRest
from auth import tryAuth
import md5
import hashlib
passPhrase = '0'
accTypes = ["admin", "user", "Noname"]
accTypeHolder = dict()
for item in accTypes:
    accTypeHolder[md5.new(item).hexdigest()] = item

userStack = dict({"200820e3227815ed1756a6b531e7e0d2": {"usertype": "user", "userid": "1", "username": "qwe", "pwd": "202cb962ac59075b964b07152d234b70"}})

sessionHolder = dict({
    "7f6ef71197989eaf11afe2cc588273d7": {"usertype": "admin", "userid": "0", "username": "ololo", "pwd": "202cb962ac59075b964b07152d234b70"},
    "e638ce6fdd2502f88962460002775972": {"usertype": "user", "userid": "1", "username": "noob", "pwd": "202cb962ac59075b964b07152d234b70"}
})


@get('/')
def index():
    username = auth.checkUserCookie()
    return bottle.template("index", user=username)


@get('/task')
def task():
    username = auth.checkUserCookie()
    if username != "Noname":
        return jtemplate('views/task', title="tasklist", loggedIn="true", name="me gusta")
    else:
        bottle.redirect("/login")


@route('/:path#.+#', name='public')
def public(path):
    print path
    return static_file(path, root='./public')


@get('/hello')
@get('/goaway')
def hello_page():
    return bottle.template("index", user="ololo")


@get('/tryagain')
def tryagain():
    return jtemplate('views/login', title="Login please", error="Invalid credentials", name="me gusta")


@get('/session')
def session():
    #user = auth.checkUser(request)
    username = auth.checkUserCookie()
    print "USER: ", username
    return bottle.template("index", user=username)


@get('/loginme')
def loginme():
    #user = auth.checkUser(request)
    user = dict({"usertype": "admin", "userid": "1234567899"})
    print user
    auth.initUser(request, response, user)
    bottle.redirect("/")


@post('/sendCred')
def sendCred():
    user = auth.getUser()
    if auth.validateUser(user):
        auth.initUser(request, response, user)
        bottle.redirect("/session")
    else:
        bottle.redirect("/tryagain")


@get('/login')
def login():
    return jtemplate('views/login', title="Login please", name="me gusta")


@get('/logout')
def logout():
    auth.logoffUser(request, response)
    bottle.redirect("/session")


connection_string = "mongodb://me:qwe123@alex.mongohq.com:10076/app9812962"
connection = pymongo.Connection(connection_string, safe=True)
db_cred = connection['app9812962']


connection_string2 = "mongodb://me:qwe123@alex.mongohq.com:10076/app9812962"
connection2 = pymongo.Connection(connection_string2, safe=True)
db_auth = connection2['app9812962']


class tryAuth():
    def __init__(self):
        self.db_cred = db_cred

    def prepare():
        print self.db_cred

    def getUser123(self, user, request, response):
        if self.validateUser(user, user):
            return dict({"usertype": "admin", "userid": "1234567899"})
        else:
            return user

    def validateUser(self, user):
        data = md5.new(md5.new(user["username"]).hexdigest() + user["pwd"]).hexdigest()
        #bduser = self.db.session.find_one({"userid": str(md5.new(user["username"] + user["pwd"]).hexdigest())})
        bduser = db_auth.sessions.find_one({"userid": data})
        print bduser
        if bduser:
            return True
        else:
            return False

    def initUser(self, request, response, user):
        sessionHolder[user["userid"]] = user
        response.set_cookie("account", md5.new(user["usertype"]).hexdigest(), secret=passPhrase)
        response.set_cookie("userName", md5.new(user["username"]).hexdigest(), secret=passPhrase)
        print sessionHolder

    def logoffUser(self, request, response):
        response.set_cookie("account", "", secret=passPhrase)

    def getUser(self):
        username = request.forms.get("login")
        pwd = request.forms.get("password")
        user = dict({"usertype": "", "username": "", "userid": "", "pwd": ""})
        user["usertype"] = "user"
        user["username"] = username
        user["userid"] = md5.new(username + pwd).hexdigest()
        user["pwd"] = md5.new(pwd).hexdigest()
        return user

    def checkUserCookie(self):
        username = request.get_cookie("account", secret=passPhrase)
        if username:
            if accTypeHolder[username]:
                return accTypeHolder[username]
            else:
                return auth.setNonameCookie()
        else:
            return auth.setNonameCookie()

    def setNonameCookie(self):
        response.set_cookie("account", md5.new("Noname").hexdigest(), secret=passPhrase)

    def run(self):
        print "run"

auth = tryAuth()

bottle.debug(True)
port = int(os.environ.get("PORT", 5300))
bottle.run(host='0.0.0.0', port=port, reloader='true', interval=0.1)
#bottle.run(host='127.0.0.1', port=port)
