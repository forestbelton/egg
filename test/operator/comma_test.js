import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import comma from '../../lib/runtime/operator/comma'

describe(', operator', function () {
    it('should duplicate top of the stack', function () {
        const context = new Context()
        context.stack = [term('float', 0), term('float', 1)]

        comma.execute(context)
        expect(context.stack).to.deep.equal([
            { type: 'float', value: 0 },
            { type: 'float', value: 1 },
            { type: 'float', value: 1 },
        ])
    })
})
