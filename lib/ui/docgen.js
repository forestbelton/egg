import operators from '../operators'

const docsPage = document.getElementById('docs')

docsPage.innerHTML += `<h2 class="doc-heading">Operators</h2>`

Object.values(operators).forEach(op => {
    const clausesDesc = op.clauses.map(clause => {
        const args = clause.sig.join(', ')
        const desc = clause.desc || 'No description available.'

        return `
            <div class="doc-clause">
                <div class="doc-section">
                    <span>Arguments</span>
                    <pre>${args}</pre>
                </div>
                <div class="doc-section">
                    <span>Description</span>
                    <p>${desc}</p>
                </div>
            </div>
        `
    })

    docsPage.innerHTML += `
        <div class="doc-operator">
            <div class="doc-name">${op.name}</div>
            ${clausesDesc.join('')}
        </div>
    `
})
