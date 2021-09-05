import m from "mithril"
import state from "./state"
import SelectProject from "./select-project"
import SelectCategory from "./select-category"
import { loadProjects } from "./loaders"

const SearchForm = {
    view() {
        return m('.col-xs-12',
            m('form.form-horizontal',
                m(SelectProject),
                m(SelectCategory),
            )
        )
    }
}

loadProjects()

const root = document.getElementById('search-container')
m.mount(root, SearchForm)
