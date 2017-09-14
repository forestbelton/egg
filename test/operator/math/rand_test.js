import { expect } from 'chai'
import { term } from '../../helper'
import Context from '../../../lib/runtime/Context'
import rand from '../../../lib/runtime/operator/math/rand'

describe('mR operator', function () {
    it('should compute a number between 0 and 1', function () {
        const context = new Context()

        rand.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.be.within(0, 1)
    })
})
