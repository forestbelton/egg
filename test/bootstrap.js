var fs = require('fs')
var peg = require('pegjs')

require.extensions['.pegjs'] = function (module, filename) {
    var content = fs.readFileSync(filename, 'utf8')
    var parser = peg.generate(content, { output: 'source' })

    module._compile('module.exports = ' + parser, filename)
}
