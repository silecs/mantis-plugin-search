import m from "mithril"

import SelectProject from "./select-project"
import SelectCategory from "./select-category"
import TicketTable from "./ticket-table"

import state from "./state"
import { loadIssues, loadProjects } from "./loaders"

const SearchForm = {
    oninit(vnode) {
        loadProjects().then(function() {
            if (vnode.attrs.projectId) {
                state.filter.setProjectId(parseInt(vnode.attrs.projectId))
                state.filter.categoryId = parseInt(vnode.attrs.categoryId)
                m.redraw()
            }
        })
    },
    view() {
        return m('.col-xs-12',
            m('form.form-horizontal',
                m(SelectProject),
                m(SelectCategory),
                m("div.form-group",
                    m("div.col-sm-offset-2.col-sm-10",
                        m("button.btn.btn-primary",
                            {
                                type: "button",
                                onclick: loadIssues
                            }, "Rafraîchir la liste de tickets"
                )))
            ),
            m(TicketTable),
        )
    }
}

const root = document.getElementById('search-container')
m.route(root, '', {
    '/': SearchForm,
    '/p/:projectId/c/:categoryId': SearchForm,
})
