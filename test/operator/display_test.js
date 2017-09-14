import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import display from '../../lib/runtime/operator/display'

describe('d operator', function () {
    it('should print a token', function () {
        const context = new Context
        context.stack = [term('string', 'foo'), term('float', 0)]

        display.execute(context)
        display.execute(context)
        expect(context.output).to.equal('0\nfoo\n')
    })
})
