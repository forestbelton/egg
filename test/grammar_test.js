import { expect } from 'chai'
import parser from '../lib/grammar.pegjs'

describe('grammar', function() {
    it('should parse a character', function() {
        const stack = parser.parse("'a")

        expect(stack).to.deep.equal([{
            type: 'char',
            value: 'a'
        }])
    })

    it('should parse a string', function() {
        const stack = parser.parse('"hello world"')

        expect(stack).to.deep.equal([{
            type: 'string',
            value: 'hello world'
        }])
    })

    it('should parse an integer', function() {
        const stack = parser.parse('1')

        expect(stack).to.have.length(1)
        expect(stack[0].type).to.equal('bigint')
        expect(stack[0].value.toJSNumber()).to.equal(1)
    })

    it('should parse a float', function() {
        const stack = parser.parse('1.')

        expect(stack).to.deep.equal([{
            type: 'float',
            value: 1
        }])
    })

    it('should parse a variable', function() {
        const stack = parser.parse('A')

        expect(stack).to.deep.equal([{
            type: 'variable',
            value: 'A'
        }])
    })

    it('should parse multiple tokens', function() {
        const stack = parser.parse('A +')

        expect(stack).to.deep.equal([
            { type: 'variable', value: 'A' },
            { type: 'operator', value: '+' }
        ])
    })

    it('should parse a block', function() {
        const stack = parser.parse('{ A + }')

        expect(stack).to.deep.equal([{
            type: 'block',
            value: [
                { type: 'variable', value: 'A' },
                { type: 'operator', value: '+' }
            ]
        }])
    })
})