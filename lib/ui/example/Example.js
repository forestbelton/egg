import React from 'react'
import ReactDOM from 'react-dom'

export default class Example extends React.Component {

    render() {
        const escapedCode = escape(this.props.compact).replace(/\+/g, '%2B')
        const sampleInput = escape(this.props.sampleInput || '').replace(/\+/g, '%2B')
        const tryHref = `?try=${escapedCode}`

        return (
            <div className="Example">
                <div className="Example-Title">
                    {this.props.title} ({this.props.compact.length} bytes)
                </div>
                <div className="Example-Description">
                    {this.props.description}
                </div>
                <a className="Example-Try" href={tryHref}>Try it here!</a>
                <div className="Example-Code">
                    <div className="Example-Code-Segment">
                        <span className="Example-Label">Compact form:</span>
                        <pre>{this.props.compact}</pre>
                    </div>
                    <div className="Example-Code-Segment">
                        <div className="Example-Label">Annotated form:</div>
                        <pre>{this.props.annotated}</pre>
                    </div>
                </div>
            </div>
        )
    }
}