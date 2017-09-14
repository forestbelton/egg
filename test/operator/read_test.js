import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import read from '../../lib/runtime/operator/read'

describe('r operator', function () {
    it('should parse input into a token', function () {
        const context = new Context()
        context.input = '"hello world"'

        read.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'string',
            value: 'hello world'
        }])
    })
})
