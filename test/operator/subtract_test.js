import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import subtract from '../../lib/runtime/operator/subtract'

describe('- operator', function () {
    it('should subtract two bigints', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[3]), term('bigint', bigInt[2])]

        subtract.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[1]
        }])
    })

    it('should subtract two floats', function () {
        const context = new Context()
        context.stack = [term('float', 3), term('float', 2)]

        subtract.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.be.closeTo(1, .00001)
    })
})

