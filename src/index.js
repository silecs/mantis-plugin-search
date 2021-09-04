import m from "mithril"

const ANY = -1
const NONE = 0

const state = {
    projectId: 0,
    setProjectId(value) {
        const oldId = state.projectId
        const id = parseInt(value)
        state.projectId = (id >= NONE ? id : ANY)
        if (oldId !== state.projectId) {
            state.categoryId = ANY
        }
        console.log(state)
    },
    categoryId: ANY,
}

function onChange(event) {
    state.setProjectId(event.target.value)
}
const SelectProject = {
    view() {
        return m('.form-group',
            m('label.control-label.col-sm-2', {"for": "search-project"}, "Projet"),
            m('.col-sm-10',
                m('select.form-control', {onchange: onChange},
                    m('option', {value: "0"}, "Tous"),
                    m('option', {value: "28"}, "Mir@bel2"),
                )
            )
        )
    }
}

const SearchForm = {
    view() {
        return m('.col-xs-12', m('form.form-horizontal',
            m(SelectProject),
        ))
    }
}

const root = document.getElementById('search-container')
m.mount(root, SearchForm)
