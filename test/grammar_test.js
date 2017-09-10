import { expect } from 'chai'
import parser from '../lib/grammar.pegjs'

describe('grammar', function() {
    it('should parse an integer', function() {
        const stack = parser.parse('1')

        expect(stack).to.have.length(1)
        expect(stack[0].type).to.equal('bigint')
        expect(stack[0].value.toJSNumber()).to.equal(1)
    })
})