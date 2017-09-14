import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import semicolon from '../../lib/runtime/operator/semicolon'

describe('; operator', function () {
    it('should discard the top element', function () {
        const context = new Context()
        context.stack = [term('string', 'a'), term('string', 'b')]

        semicolon.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'string',
            value: 'a'
        }])
    })
})

