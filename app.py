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
from bottle import BaseTemplate, template, view
from jinja2 import Environment, FunctionLoader
import functools


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


class JadeTemplate(BaseTemplate):
    extensions = ['tpl', 'html', 'thtml', 'stpl', 'jade']

    def prepare(self, filters=None, tests=None, **kwargs):
        if 'prefix' in kwargs:  # TODO: to be removed after a while
            raise RuntimeError('The keyword argument `prefix` has been removed. Use the full jinja2 environment name line_statement_prefix instead.')
        self.env = Environment(
            loader=FunctionLoader(self.loader),
            extensions=['pyjade.ext.jinja.PyJadeExtension'],
            **kwargs
        )
        if filters:
            self.env.filters.update(filters)
        if tests:
            self.env.tests.update(tests)
        if self.source:
            self.tpl = self.env.from_string(self.source)
        else:
            self.tpl = self.env.get_template(self.filename)

    def render(self, *args, **kwargs):
        for dictarg in args:
            kwargs.update(dictarg)
        _defaults = self.defaults.copy()
        _defaults.update(kwargs)
        return self.tpl.render(**_defaults)

    def loader(self, name):
        fname = self.search(name, self.lookup)
        if not fname:
            return
        with open(fname, "rb") as f:
            return f.read().decode(self.encoding)

jade_template = functools.partial(template, template_adapter=JadeTemplate)
jade_view = functools.partial(view, template_adapter=JadeTemplate)
