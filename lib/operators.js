import array from './operator/array'
import caret from './operator/caret'
import display from './operator/display'
import divide from './operator/divide'
import float from './operator/float'
import greaterthan from './operator/greaterthan'
import lessthan from './operator/lessthan'
import mult from './operator/multiply'
import plus from './operator/plus'
import read from './operator/read'
import subtract from './operator/subtract'

import abs from './operator/math/abs'
import cos from './operator/math/cos'
import sin from './operator/math/sin'
import tan from './operator/math/tan'

export default {
    '+': plus,
    '-': subtract,
    '*': mult,
    '/': divide,
    '^': caret,
    ']': array,
    '<': lessthan,
    '>': greaterthan,
    'd': display,
    'f': float,
    'r': read,

    'ma': abs,
    'mc': cos,
    'ms': sin,
    'mt': tan
}
