import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import gt from '../../lib/runtime/operator/greaterthan'

describe('> operator', function () {
    it('should take n first elements from an array', function () {
        const context = new Context()
        context.stack = [
            term('array', [
                term('string', 'a'),
                term('string', 'b'),
                term('string', 'c')
            ]),
            term('float', 2)
        ]

        gt.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'array',
            value: [
                { type: 'string', value: 'a' },
                { type: 'string', value: 'b' }
            ]
        }])
    })

    it('should return 1 when float is greater', function () {
        const context = new Context()
        context.stack = [term('float', 2), term('float', 1)]

        gt.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should return 0 when float is not greater', function () {
        const context = new Context()
        context.stack = [term('float', 2), term('float', 3)]

        gt.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })

    it('should return 1 when bigint is greater', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[2]), term('bigint', bigInt[1])]

        gt.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should return 0 when bigint is not greater', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[2]), term('bigint', bigInt[3])]

        gt.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })

    it('should return 1 when string is greater', function () {
        const context = new Context()
        context.stack = [term('string', 'b'), term('string', 'a')]

        gt.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should return 0 when string is not greater', function () {
        const context = new Context()
        context.stack = [term('string', 'b'), term('string', 'c')]

        gt.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })
})
