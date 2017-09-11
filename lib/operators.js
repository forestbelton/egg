import array from './operator/array'
import caret from './operator/caret'
import comma from './operator/comma'
import display from './operator/display'
import divide from './operator/divide'
import equals from './operator/equals'
import float from './operator/float'
import greaterthan from './operator/greaterthan'
import hash from './operator/hash'
import lessthan from './operator/lessthan'
import modulo from './operator/modulo'
import mult from './operator/multiply'
import plus from './operator/plus'
import power from './operator/power'
import read from './operator/read'
import set from './operator/set'
import subtract from './operator/subtract'
import permute from './operator/permute'

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
    equals,
    float,
    greaterthan,
    hash,
    lessthan,
    modulo,
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

'0123456789abcdefghijklmn'.split('').forEach(permutation => {
    table['@' + permutation] = permute(permutation)
})

'ABCDEFG'.split('').forEach(v => {
    table[':' + v] = set(v)
})

export default table