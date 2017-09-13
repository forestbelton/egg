import { expect } from 'chai'
import { term } from '../../helper'
import Context from '../../../lib/runtime/Context'
import sin from '../../../lib/runtime/operator/math/sin'

describe('ms operator', function() {
    it('should compute sine', function() {
        const context = new Context()
        context.stack = [term('float', 2 * Math.PI)]

        sin.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.be.closeTo(0, .00001)
    })
})