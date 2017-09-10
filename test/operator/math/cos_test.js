import { expect } from 'chai'
import { term } from '../../helper'
import Context from '../../../lib/Context'
import cos from '../../../lib/operator/math/cos'

describe('mc operator', function() {
    it('should compute cosine', function() {
        const context = new Context()
        context.stack = [term('float', 2 * Math.PI)]

        cos.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.be.closeTo(1, .00001)
    })
})