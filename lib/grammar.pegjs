{
    var bigInt = require('big-integer')
}

Stack
    = terms:(Comment / Term)* {
        return terms.filter(term => term !== '')
    }

Comment
    = '#' [^\r\n]* WS {
        return ''
    }

Term
    = Char
    / String
    / Float
    / BigInt
    / Block
    / Variable
    / Operator

Block "block"
    = '{' WS body:Stack '}' WS {
        return {
            type: 'block',
            value: body
        }
    }

Operator "operator"
    = op:(MathOp / RotateOp / SetOp / AnyOp) WS {
        return {
            type: 'operator',
            value: op
        }
    }

// catch-all for operators
AnyOp = [^A-Z0-9{}]

// stack rotation operators
RotateOp
    = '@' suffix:[0-9a-n] {
        return '@' + suffix
    }

// variable set operators
SetOp
    = ':' v:[A-G] {
        return ':' + v
    }

// math operators
MathOp
    = 'm' suffix:[acst] {
        return 'm' + suffix
    }

Char "character"
    = '\'' c:. WS {
        return {
            type: 'char',
            value: c
        }
    }

String "string"
    = '"' content:SChar* '"' WS {
        return {
            type: 'string',
            value: content.join('')
        }
    }

SChar
    = '\\"'
    / !'"' c:. {
        return c
    }

Float "float"
    = whole:[0-9]* '.' fract:[0-9]* WS {
        if (whole.length === 0 && fract.length === 0) {
            throw new Error('. must be accompanied by at least 1 digit')
        }

        return {
            type: 'float',
            value: parseFloat(whole.join('') + '.' + fract.join(''))
        }
    }

BigInt "bigint"
    = digits:[0-9]+ WS {
        return {
            type: 'bigint',
            value: bigInt(digits.join(''), 10)
        }
    }
    / 'x' digits:[0-9a-fA-F]+ WS {
        return {
            type: 'bigint',
            value: bigInt(digits.join(''), 16)
        }
    }

Variable "variable"
    = v:[A-Z] WS {
        return {
            type: 'variable',
            value: v
        }
    }

WS "whitespace"
    = [ \t\r\n]*
