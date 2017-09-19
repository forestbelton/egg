{
    var bigInt = require('big-integer')
    var Token = require('./Token.purs')
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
    / CharRange
    / String
    / Float
    / BigInt
    / Block
    / Variable
    / Operator

Block "block"
    = '{' WS body:Stack '}' WS {
        return Token.Block.create(body)
    }

Operator "operator"
    = op:(MathOp / RotateOp / SetOp / AnyOp) WS {
        return Token.Op.create(op)
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
    = 'm' suffix:[a-zA-Z] {
        return 'm' + suffix
    }

Char "character"
    = '\'' c:. WS {
        return Token.Str.create(c)
    }

CharRange "character range"
    = start:[a-zA-Z] '..' end:[a-zA-Z] WS {
        if (end < start) {
            throw new Error('invalid character range')
        }

        let s = ''
        for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); ++i) {
            s += String.fromCharCode(i)
        }

        return Token.Str.create(s)
    }

String "string"
    = '"' content:SChar* '"' WS {
        return Token.Str.create(content.join(''))
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

        return Token.Num.create(
            parseFloat(whole.join('') + '.' + fract.join(''))
        )
    }

BigInt "bigint"
    = digits:[0-9]+ WS {
        const val = bigInt(digits.join(''), 10)
        return Token.BInt.create(val)
    }
    / 'x' digits:[0-9a-fA-F]+ WS {
        const val = bigInt(digits.join(''), 16)
        return Token.BInt.create(val)
    }

Variable "variable"
    = v:[A-Z] WS {
        return Token.Var.create(v)
    }

WS "whitespace"
    = [ \t\r\n]*
