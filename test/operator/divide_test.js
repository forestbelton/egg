import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import divide from '../../lib/runtime/operator/divide'

describe('/ operator', function () {
    it('should divide two bigints', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[5]), term('bigint', bigInt[2])]

        divide.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[2]
        }])
    })

    it('should divide two floats', function () {
        const context = new Context()
        context.stack = [term('float', 5), term('float', 2)]

        divide.execute(context)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.be.closeTo(2.5, .00001)
    })

    it('should split a string', function () {
        const context = new Context()
        context.stack = [term('string', 'a b c'), term('string', ' ')]

        divide.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'array',
            value: [
                { type: 'string', value: 'a' },
                { type: 'string', value: 'b' },
                { type: 'string', value: 'c' }
            ]
        }])
    })

    it('should map over an array', function () {
        const array = term('array', [
            term('bigint', bigInt[1]),
            term('bigint', bigInt[2]),
            term('bigint', bigInt[3])
        ])

        const block = term('block', [
            term('bigint', bigInt[1]),
            term('operator', '+')
        ])

        const expected = [{
            type: 'array',
            value: [
                { type: 'bigint', value: bigInt[2] },
                { type: 'bigint', value: bigInt[3] },
                { type: 'bigint', value: bigInt[4] }
            ]
        }]

        const context = new Context()

        context.stack = [array, block]
        divide.execute(context)
        expect(context.stack).to.deep.equal(expected)

        context.stack = [block, array]
        divide.execute(context)
        expect(context.stack).to.deep.equal(expected)
    })
})
