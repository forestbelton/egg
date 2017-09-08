import display from './operator/display'
import divide from './operator/divide'
import mult from './operator/multiply'
import plus from './operator/plus'
import subtract from './operator/subtract'

import abs from './operator/math/abs'

export default {
    '+': plus,
    '-': subtract,
    '*': mult,
    '/': divide,
    'd': display,

    'ma': abs
}
