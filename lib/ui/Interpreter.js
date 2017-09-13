import React from 'react'
import ReactDOM from 'react-dom'

import Context from '../Context'

class Interpreter extends React.Component {

    constructor(props) {
        super(props)

        this.updateByteCount = this.updateByteCount.bind(this)
        this.executeInterpreter = this.executeInterpreter.bind(this)
        this.gotoPermalink = this.gotoPermalink.bind(this)
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search)

        const code = searchParams.get('try')
        if (code !== null) {
            this.code.value = unescape(code)
            this.updateByteCount()
        }

        const input = searchParams.get('input')
        if (input !== null) {
            this.input.value = unescape(input)
        }
    }

    updateByteCount(ev) {
        ev && ev.preventDefault()
        this.byteCount.innerHTML = `${this.code.value.length} bytes`
    }

    gotoPermalink(ev) {
        ev && ev.preventDefault()

        const escapedCode = escape(this.code.value).replace(/\+/g, '%2B')
        const escapedInput = escape(this.input.value).replace(/\+/g, '%2B')

        const params = `?try=${escapedCode}&input=${escapedInput}#interpreter`
        window.location.href = window.location.href.replace(/(\?.*)?$/, params)
    }

    executeInterpreter(ev) {
        ev && ev.preventDefault()

        const code = this.code.value
        const input = this.input.value
        const outputField = this.output

        try {
		    const context = new Context(code, input)
		    const output = context.execute()

            outputField.style.color = '#000'
            outputField.value = output
        } catch(e) {
            outputField.style.color = '#c0392b'
            outputField.value = e.stack.toString()
        }
    }

    render() {
        return (
            <div>
                <form id="inputForm" onSubmit={this.executeInterpreter}>
                    <div className="section">
                        <label htmlFor="code">Code:</label>
                        <textarea onKeyUp={this.updateByteCount} ref={code => this.code = code} name="code"></textarea>
                        <div className="byteCount" ref={byteCount => this.byteCount = byteCount}>0 bytes</div>
                    </div>
                    <div className="section">
                        <label htmlFor="input">Input:</label>
                        <textarea ref={input => this.input = input} name="input"></textarea>
                    </div>

                    <button type="submit">Run</button>
                    <button className="permalink" onClick={this.gotoPermalink}>Permalink</button>
                </form>
                <div className="section output">
                    <label htmlFor="output">Output:</label>
                    <textarea ref={output => this.output = output} readOnly></textarea>
                </div>
            </div>
        )
    }
}

export default Interpreter