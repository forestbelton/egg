import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import modulo from '../../lib/runtime/operator/modulo'

describe('% operator', function () {
    it('should compute modulus', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[5]), term('bigint', bigInt[3])]

        modulo.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[2]
        }])
    })

    it('should compute a number between 0 and 1', function () {
        const context = new Context()
        context.stack = [term('float', 1)]

        modulo.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.be.within(0, 1)
    })
})
