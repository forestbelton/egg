import operators from '../operators'

const operatorDocs = document.querySelector('.doc-operators')

Object.values(operators).forEach(op => {
    const clausesDesc = op.clauses.map(clause => {
        const args = clause.sig.join(', ') || 'none'
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

    operatorDocs.innerHTML += `
        <div class="doc-operator">
            <div class="doc-name">${op.name}</div>
            ${clausesDesc.join('')}
        </div>
    `
})
