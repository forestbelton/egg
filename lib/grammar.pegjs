{
    var bigInt = require('big-integer')
}

Stack
    = Term*

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
    = op:(Op1 / MathOp / RotateOp) WS {
        return {
            type: 'operator',
            value: op
        }
    }

// single char operators
Op1 = [*/+\-dpr\]<>^,]

// stack rotation operators
RotateOp
    = '@' suffix:[0-9a-n] {
        return '@' + suffix
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

Variable "variable"
    = v:[A-Z] WS {
        return {
            type: 'variable',
            value: v
        }
    }

WS "whitespace"
    = [ \t\r\n]*
