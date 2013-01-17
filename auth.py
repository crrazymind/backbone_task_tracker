import bottle
import pymongo
import re
import datetime
import random
import hmac
import user
import json
import sys
import os
import ast
from bottle import get, post, request, put
from bson import BSON
from bson import json_util
from bson.objectid import ObjectId

connection_string = "mongodb://me:qwe123@alex.mongohq.com:10076/app9812962"
connection = pymongo.Connection(connection_string, safe=True)
db = connection['app9812962']
port = int(os.environ.get("PORT", 5000))
#http://beaker.readthedocs.org/en/latest/


class tryAuth():
    def __init__(self):
        self.db = db
        self.hashRepo = []

    def prepare():
        print self.db

    def checkUser(user):
        return true

    def initUser():
        return true

    def run(self):
        prepare()
        print "run"
