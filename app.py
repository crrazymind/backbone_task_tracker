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
passPhrase = '0'
accTypes = ["admin", "user", "noname"]
accTypeHolder = dict()
for item in accTypes:
    accTypeHolder[md5.new(item).digest()] = item

userStack = dict({"200820e3227815ed1756a6b531e7e0d2": {"usertype": "user", "userid": "1", "username": "qwe", "pwd": "202cb962ac59075b964b07152d234b70"}})

sessionHolder = dict({
    "7f6ef71197989eaf11afe2cc588273d7": {"usertype": "admin", "userid": "0", "username": "ololo", "pwd": "202cb962ac59075b964b07152d234b70"},
    "e638ce6fdd2502f88962460002775972": {"usertype": "user", "userid": "1", "username": "noob", "pwd": "202cb962ac59075b964b07152d234b70"}
})


@get('/')
def index():
    user = auth.checkUser(request)
    return bottle.template("index", user=user)


@get('/task')
def task():
    return jtemplate('views/task', title="tasklist", loggedIn="true", name="me gusta")


@route('/:path#.+#', name='public')
def public(path):
    print path
    return static_file(path, root='./public')


@get('/hello')
def hello_page():
    return bottle.template("index", user=user)


@get('/session')
def session():
    #user = auth.checkUser(request)
    user = auth.getUser(user, request, response)
    print "USER: ", user
    return bottle.template("index", user=user)


@get('/loginme11')
def login():
    user = auth.checkUser(request)
    auth.initUser(request, response, "admin")
    bottle.redirect("/session")


@get('/loginme')
def login():
    user = auth.checkUser(request)
    user = dict({"usertype": "admin", "userid": "1234567899"})
    print user
    auth.initUser(request, response, user)
    bottle.redirect("/")


@post('/sendCred')
def login():
    user = auth.getUser()
    if auth.checkUser(user):
        auth.initUser(request, response, user)
        bottle.redirect("/session")
    else:
        bottle.redirect("/login")


@get('/login')
def login():
    return jtemplate('views/login', title="Login please", loggedIn="false", name="me gusta")


@get('/logout')
def logout():
    auth.logoffUser(request, response)
    bottle.redirect("/session")


connection_string = "mongodb://me:qwe123@alex.mongohq.com:10076/app9812962"
connection = pymongo.Connection(connection_string, safe=True)
db = connection['app9812962']


class tryAuth():
    def __init__(self):
        self.db = db

    def prepare():
        print self.db

    def getUser123(self, user, request, response):
        if self.validateUser(user, user):
            return dict({"usertype": "admin", "userid": "1234567899"})
        else:
            return user

    def validateUser(self, user):
        #user.username
        bduser = self.db.session.find_one({"userid": md5.new(user["username"] + user["pwd"]).digest()})
        print dbuser
        if bduser:
            return True

    def initUser(self, request, response, user):
        #self.checkUser()
        sessionHolder[user["userid"]] = user
        response.set_cookie("account", md5.new(user["usertype"]).digest(), secret=passPhrase)
        response.set_cookie("userName", md5.new(user["username"]).digest(), secret=passPhrase)
        print sessionHolder

    def logoffUser(self, request, response):
        response.set_cookie("account", "", secret=passPhrase)

    def checkUser(self, user):
        if self.validateUser(user):
            return True
        else:
            return False

    def getUser(self):
        username = request.forms.get("login")
        pwd = request.forms.get("password")
        user = dict({"usertype": "", "username": "", "userid": "", "pwd": ""})
        user["usertype"] = "user"
        user["username"] = username
        user["userid"] = md5.new(username + pwd).digest()
        user["pwd"] = md5.new(pwd).digest()
        return user

    def checkUser1(self, request):
        username = request.get_cookie("account", secret=passPhrase)
        if username:
            if accTypeHolder[username]:
                return accTypeHolder[username]
            else:
                return auth.setNonameCookie()
        else:
            return auth.setNonameCookie()

    def setNonameCookie(self):
        response.set_cookie("account", md5.new("noname").digest(), secret=passPhrase)

    def run(self):
        print "run"

auth = tryAuth()

bottle.debug(True)
port = int(os.environ.get("PORT", 5300))
bottle.run(host='0.0.0.0', port=port, reloader='true', interval=0.1)
#bottle.run(host='127.0.0.1', port=port)
