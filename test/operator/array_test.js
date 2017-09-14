import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import array from '../../lib/runtime/operator/array'

describe('] operator', function() {
    it('should create an array', function() {
        const context = new Context()
        context.stack = [term('bigint', bigInt[1]), term('float', 3.14), term('string', 'foo')]

        array.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'array',
            value: [
                { type: 'bigint', value: bigInt[1] },
                { type: 'float', value: 3.14 },
                { type: 'string', value: 'foo' }
            ]
        }])
    })
})
