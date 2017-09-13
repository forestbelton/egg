const VALID_PAGES = ['interpreter', 'docs', 'examples']

export function changePage(ev) {
    if (typeof ev !== 'undefined') {
        ev.preventDefault()
        window.location.hash = ev.target.href.replace(/.*#/, '')
    }

    let page = (ev && ev.target.href.replace(/.*#/, ''))
        || (window.location.hash && window.location.hash.replace(/.*#/, ''))

    if (VALID_PAGES.indexOf(page) === -1) {
        page = VALID_PAGES[0]
    }

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