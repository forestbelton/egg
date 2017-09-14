import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import zip from '../../lib/runtime/operator/zip'

describe('z operator', function() {
    it('should zip two arrays', function() {
        const arr = {
            type: 'array',
            value: [
                { type: 'string', value: '1' },
                { type: 'string', value: '2' }
            ]
        }

        const context = new Context()
        context.stack = [arr, arr]

        zip.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'array',
            value: [
                {
                    type: 'array',
                    value: [
                        { type: 'string', value: '1' },
                        { type: 'string', value: '1' }
                    ]
                },
                {
                    type: 'array',
                    value: [
                        { type: 'string', value: '2' },
                        { type: 'string', value: '2' }
                    ]
                }
            ]
        }])
    })

    it('should zip two arrays with block', function() {
        const arr = {
            type: 'array',
            value: [
                { type: 'string', value: '1' },
                { type: 'string', value: '2' }
            ]
        }
        const add = {
            type: 'block',
            value: [{ type: 'operator', value: '+' }]
        }

        const context = new Context()
        context.stack = [arr, arr, add]

        zip.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'array',
            value: [
                { type: 'string', value: '11' },
                { type: 'string', value: '22' }
            ]
        }])
    })
})