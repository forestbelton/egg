import Context from './lib/Context'

var inputForm = document.getElementById('inputForm')
var codeField = document.getElementById('code')
var inputField = document.getElementById('input')
var outputField = document.getElementById('output')

function changePage(ev) {
    const page = (ev && ev.target.href.replace(/.*#/, ''))
        || (window.location.hash && window.location.hash.replace(/.*#/, ''))
        || 'interpreter'

    const activeLink = document.querySelector('.nav .active')
    if (activeLink !== null) {
        activeLink.className = ''
    }
    document.querySelector(`a[href="#${page}"]`).className = 'active'

    const activePage = document.querySelector('.page.visible')
    if (activePage !== null) {
        activePage.className = 'page'
    }

    document.getElementById(page).className = 'page visible'
}

document.querySelectorAll('.nav a').forEach(navLink =>
    navLink.addEventListener('click', changePage)
)

changePage()

inputForm.addEventListener('submit', ev => {
    ev.preventDefault()

    var code = codeField.value
    var input = inputField.value

    try {
		var context = new Context(code, input)
		var output = context.execute()

        outputField.style.color = '#000'
        outputField.value = output
    } catch(e) {
        outputField.style.color = '#c0392b'
        outputField.value = e.stack.toString()
    }
})
