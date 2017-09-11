import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/Context'
import hash from '../../lib/operator/hash'

describe('# operator', function() {
    it('should evaluate code', function() {
        const context = new Context()
        context.stack = [term('string', '1 2 +')]

        hash.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('bigint')
        expect(context.stack[0].value.toJSNumber()).to.equal(3)
    })
})