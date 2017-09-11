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

const operators = [
    array,
    caret,
    comma,
    display,
    divide,
    float,
    greaterthan,
    hash,
    lessthan,
    mult,
    plus,
    power,
    read,
    subtract,

    abs,
    cos,
    sin,
    tan
]

const table = {}
operators.forEach(op => table[op.name] = op)

export default table