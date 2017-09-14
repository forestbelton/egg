import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import equals from '../../lib/runtime/operator/equals'

describe('= operator', function () {
    it('should evaluate to 1 when strings are equal', function () {
        const context = new Context()
        context.stack = [term('string', 'a'), term('string', 'a')]

        equals.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should evaluate to 0 when strings are different', function () {
        const context = new Context()
        context.stack = [term('string', 'a'), term('string', 'b')]

        equals.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })

    it('should evaluate to 1 when bigints are equal', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[1]), term('bigint', bigInt[1])]

        equals.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should evaluate to 0 when bigints are different', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[1]), term('bigint', bigInt[2])]

        equals.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })
})
