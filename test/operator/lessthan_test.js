import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import lessthan from '../../lib/runtime/operator/lessthan'

describe('< operator', function() {
    it('should drop n first arguments from an array', function () {
        const context = new Context()
        context.stack = [
            term('array', [
                term('string', 'a'),
                term('string', 'b'),
                term('string', 'c')
            ]),
            term('float', 2)
        ]

        lessthan.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'array',
            value: [
                { type: 'string', value: 'c' }
            ]
        }])
    })

    it('should evaluate to 1 when float is less', function() {
        const context = new Context()
        context.stack = [term('float', 1), term('float', 2)]

        lessthan.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should evaluate to 0 when float is not less', function() {
        const context = new Context()
        context.stack = [term('float', 1), term('float', 0)]

        lessthan.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })

    it('should evaluate to 1 when bigint is less', function() {
        const context = new Context()
        context.stack = [term('bigint', bigInt[1]), term('float', bigInt[2])]

        lessthan.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should evaluate to 0 when bigint is not less', function() {
        const context = new Context()
        context.stack = [term('bigint', bigInt[1]), term('float', bigInt[0])]

        lessthan.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })

    it('should evaluate to 1 when string less than', function() {
        const context = new Context()
        context.stack = [term('string', 'a'), term('string', 'b')]

        lessthan.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should evaluate to 0 when string not less than', function() {
        const context = new Context()
        context.stack = [term('string', 'a'), term('string', 'A')]

        lessthan.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })
})
