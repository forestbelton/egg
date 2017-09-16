import { canCoerce } from './coerce'

import array from './operator/array'
import caret from './operator/caret'
import comma from './operator/comma'
import display from './operator/display'
import divide from './operator/divide'
import equals from './operator/equals'
import float from './operator/float'
import greaterthan from './operator/greaterthan'
import backslash from './operator/backslash'
import lessthan from './operator/lessthan'
import lparen from './operator/lparen'
import modulo from './operator/modulo'
import mult from './operator/multiply'
import pipe from './operator/pipe'
import plus from './operator/plus'
import power from './operator/power'
import read from './operator/read'
import reverse from './operator/reverse'
import rparen from './operator/rparen'
import semicolon from './operator/semicolon'
import set from './operator/set'
import show from './operator/show'
import subtract from './operator/subtract'
import permute from './operator/permute'
import zip from './operator/zip'

import abs from './operator/math/abs'
import cos from './operator/math/cos'
import rand from './operator/math/rand'
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
    backslash,
    lessthan,
    lparen,
    modulo,
    mult,
    plus,
    power,
    read,
    pipe,
    semicolon,
    rparen,
    show,
    subtract,
    reverse,
    zip,

    abs,
    cos,
    rand,
    sin,
    tan
]

function validate(op) {
    op.clauses.forEach((clause, i) => {
        const prevClauses = op.clauses.slice(0, i)
        const lastClause = prevClauses.length > 0
            && prevClauses[prevClauses.length - 1]

        if (lastClause && lastClause.sig.length < clause.sig.length) {
            throw new Error(`${op.name} - clause ${i} has less specificity than clause ${i+1}`)
        }

        prevClauses.forEach(prevClause => {
            const prevSig = prevClause.sig.slice(-clause.sig.length)
            let subsumes = true

            for (let j = 0; j < clause.sig.length; ++j) {
                if (!canCoerce(clause.sig[j], prevSig[j])) {
                    subsumes = false
                    break
                }
            }

            if (subsumes) {
                throw new Error(`${op.name} - clause ${i} is subsumed by clause ${j}`)
            }
        })
    })
}

const table = {}
operators.forEach(op => {
    validate(op)
    table[op.name] = op
})

'0123456789abcdefghijklmn'.split('').forEach(permutation => {
    table['@' + permutation] = permute(permutation)
})

'ABCDEFG'.split('').forEach(v => {
    table[':' + v] = set(v)
})

export default table