import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import set from '../../lib/runtime/operator/set'

describe(': operator', function () {
    it('should set a variable', function () {
        const context = new Context()
        context.stack = [term('float', 1)]

        set('A').execute(context)
        expect(context.env['A']).to.deep.equal({
            type: 'float',
            value: 1
        })
    })
})
