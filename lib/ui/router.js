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
