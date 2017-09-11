import array from './operator/array'
import caret from './operator/caret'
import comma from './operator/comma'
import display from './operator/display'
import divide from './operator/divide'
import float from './operator/float'
import greaterthan from './operator/greaterthan'
import hash from './operator/hash'
import lessthan from './operator/lessthan'
import mult from './operator/multiply'
import plus from './operator/plus'
import power from './operator/power'
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
    '#': hash,
    ',': comma,
    'd': display,
    'f': float,
    'p': power,
    'r': read,

    'ma': abs,
    'mc': cos,
    'ms': sin,
    'mt': tan
}
