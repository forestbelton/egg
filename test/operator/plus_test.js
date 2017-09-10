import { expect } from 'chai'
import Context from '../../lib/Context'

describe('+ operator', function() {
    it('should add two bigints', function() {
        const context = new Context('1 2 +', '')
        context.execute()

        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('bigint')
        expect(context.stack[0].value.toJSNumber()).to.equal(3)
    })
})