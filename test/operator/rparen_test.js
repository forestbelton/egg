import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import rparen from '../../lib/runtime/operator/rparen'

describe(') operator', function () {
    it('should increment a bigint', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[0])]

        rparen.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })
})
