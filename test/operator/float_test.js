import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import float from '../../lib/runtime/operator/float'

describe('f operator', function () {
    it('should parse a float from a string', function () {
        const context = new Context()
        context.stack = [term('string', '3.14')]

        float.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'float',
            value: 3.14
        }])
    })

    it('should convert a bigint to a float', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[1])]

        float.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'float',
            value: 1
        }])
    })
})
