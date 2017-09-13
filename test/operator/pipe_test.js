import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/Context'
import pipe from '../../lib/operator/pipe'

describe('| operator', function() {
    it('should evaluate to 1 when divisible', function() {
        const context = new Context()
        context.stack = [term('bigint', bigInt[6]), term('bigint', bigInt[3])]

        pipe.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should evaluate to 0 when not divisible', function() {
        const context = new Context()
        context.stack = [term('bigint', bigInt[7]), term('bigint', bigInt[3])]

        pipe.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[0]
        }])
    })
})