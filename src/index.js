import m from "mithril"

import SelectProject from "./select-project"
import SelectCategory from "./select-category"
import TicketTable from "./ticket-table"

import { loadIssues, loadProjects } from "./loaders"

const SearchForm = {
    view() {
        return m('.col-xs-12',
            m('form.form-horizontal',
                m(SelectProject),
                m(SelectCategory),
                m("button.btn.btn-primary",
                    {
                        type: "button",
                        onclick: loadIssues
                    }, "Rafraîchir")
            ),
            m(TicketTable),
        )
    }
}

loadProjects()

const root = document.getElementById('search-container')
m.mount(root, SearchForm)
