import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import lessthan from '../../lib/runtime/operator/lessthan'

describe('< operator', function() {
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