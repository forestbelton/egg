import operators from '../operators'
import variables from '../variables'

const variableDocs = document.querySelector('.doc-variables > tbody')
const operatorDocs = document.querySelector('.doc-operators > tbody')

Object.values(operators).forEach(op => {
    const clausesDesc = op.clauses.map(clause => {
        const args = clause.sig.join(', ') || 'none'
        const desc = clause.desc || 'No description available.'

        return `
            <tr class="doc-operator">
                <td>${op.name}</td>
                <td>${args}</td>
                <td>${desc}</td>
            </tr>
        `
    })

    operatorDocs.innerHTML += clausesDesc.join('')
})

variables.forEach(v => {
    variableDocs.innerHTML += `
        <tr class="doc-variable">
            <td>${v.name}</td>
            <td>${v.desc}</td>
        </tr>
    `
})