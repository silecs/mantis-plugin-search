import m from "mithril"
import state from "./state"
import SelectProject from "./select-project"

const SearchForm = {
    view() {
        return m('.col-xs-12',
            m('form.form-horizontal',
                m(SelectProject),
            )
        )
    }
}

const root = document.getElementById('search-container')
m.mount(root, SearchForm)
