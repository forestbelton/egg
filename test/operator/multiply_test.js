import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import multiply from '../../lib/runtime/operator/multiply'

describe('* operator', function () {
    it('should multiply two bigints', function () {
        const context = new Context()
        context.stack = [term('bigint', bigInt[3]), term('bigint', bigInt[4])]

        multiply.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[12]
        }])
    })

    it('should multiply two floats', function () {
        const context = new Context()
        context.stack = [term('float', 3), term('float', 4)]

        multiply.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('float')
        expect(context.stack[0].value).to.be.closeTo(12, 0.00001)
    })

    it('should join an array of strings', function () {
        const context = new Context()
        context.stack = [
            term('array', [
                term('string', 'a'),
                term('string', 'b'),
                term('string', 'c')
            ]),
            term('string', ' ')
        ]

        multiply.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'string',
            value: 'a b c'
        }])
    })

    it('should repeat an array', function () {
        const contents = [
            term('string', 'a'),
            term('string', 'b')
        ]

        const context = new Context()
        context.stack = [
            term('array', contents),
            term('float', 2)
        ]

        multiply.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'array',
            value: contents.concat(contents)
        }])
    })

    it('should repeat a string', function () {
        const context = new Context()
        context.stack = [
            term('string', 'abc'),
            term('float', 2)
        ]

        multiply.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'string',
            value: 'abcabc'
        }])
    })

    it('should execute a block multiple times', function () {
        const context = new Context()
        context.stack = [
            term('bigint', bigInt[1]),
            term('block', [
                term('bigint', bigInt[1]),
                term('operator', '+')
            ]),
            term('float', 3)
        ]

        multiply.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint',
            value: bigInt[4]
        }])
    })

    it('should set I during block execution', function () {
        const context = new Context()
        context.stack = [term('block', [
            term('variable', 'I'),
            term('operator', 'd')
        ]), term('float', 3)]

        multiply.execute(context)
        expect(context.env['I']).to.deep.equal({
            type: 'bigint',
            value: bigInt[2]
        })

        expect(context.output).to.equal('0\n1\n2\n')
    })
})
