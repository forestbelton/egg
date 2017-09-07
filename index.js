var parser = require('./lib/grammar.pegjs')
var operators = require('./lib/operators')

var inputForm = document.getElementById('inputForm')
var codeField = document.getElementById('code')
var inputField = document.getElementById('input')
var outputField = document.getElementById('output')

function execute(code, input) {
    var stack = []
    var tokens = parser.parse(code)

    for (var i = 0; i < tokens.length; ++i) {
        executeToken(stack, tokens[i])
    }
}

function executeToken(stack, token) {
    if (token.type === 'operator') {
        var op = operators[token.value]

        if (typeof op === 'undefined') {
            throw new Error('unsupported operator: ' + token.value)
        }
    } else {
        stack.push(token)
    }
}

inputForm.addEventListener('submit', ev => {
    ev.preventDefault()

    var code = codeField.value
    var input = inputField.value
    
    try {
        outputField.style.color = '#000'
        outputField.value = execute(code, input)
    } catch(e) {
        outputField.style.color = '#c0392b'
        outputField.value = e.toString()
    }
})
