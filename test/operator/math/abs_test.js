import { expect } from 'chai'
import { term } from '../../helper'
import Context from '../../../lib/runtime/Context'
import abs from '../../../lib/runtime/operator/math/abs'

describe('ma operator', function() {
    it('should compute absolute value for bigints', function() {
        const context = new Context()
        context.stack = [term('bigint', -1)]

        abs.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('bigint')
        expect(context.stack[0].value.toJSNumber()).to.equal(1)
    })

    it('should compute absolute value for floats', function() {
        const context = new Context()
        context.stack = [term('float', -1)]

        abs.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.equal(1)
    })
})