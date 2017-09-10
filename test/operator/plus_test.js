import { expect } from 'chai'
import Context from '../../lib/Context'

describe('+', function() {
    it('should add two bigints', function() {
        const context = new Context('1 2 +', '')
        context.execute()

        expect(context.stack).to.have.length(1)
    })
})