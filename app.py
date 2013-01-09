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
from bottle import get, post, request, put, route
from bson import BSON
from bson import json_util
from bson.objectid import ObjectId
from bottle import static_file


@get('/')
def index():
    return bottle.template("index")


@route('/:path#.+#', name='public')
def public(path):
    print path
    return static_file(path, root='./public')


@get('/hello')
def hello_page():
    return bottle.template("index")

bottle.debug(True)
port = int(os.environ.get("PORT", 5300))
bottle.run(host='0.0.0.0', port=port, reloader='true', interval=1)
#bottle.run(host='127.0.0.1', port=port)
