import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/Context'
import plus from '../../lib/operator/plus'

describe('+ operator', function() {
    it('should add two bigints', function() {
        const context = new Context()
        context.stack = [term('bigint', 1), term('bigint', 2)]

        plus.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('bigint')
        expect(context.stack[0].value.toJSNumber()).to.equal(3)
    })
})