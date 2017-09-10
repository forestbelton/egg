import array from './operator/array'
import display from './operator/display'
import divide from './operator/divide'
import greaterthan from './operator/greaterthan'
import lessthan from './operator/lessthan'
import mult from './operator/multiply'
import plus from './operator/plus'
import read from './operator/read'
import subtract from './operator/subtract'

import abs from './operator/math/abs'

export default {
    '+': plus,
    '-': subtract,
    '*': mult,
    '/': divide,
    ']': array,
    '<': lessthan,
    '>': greaterthan,
    'd': display,
    'r': read,

    'ma': abs
}
