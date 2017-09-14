import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import power from '../../lib/runtime/operator/power'

describe('p operator', function () {
    it('should raise a bigint to a power', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[2]), term('bigint', bigInt[10])]

        power.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt(1024)
        }])
    })
})
