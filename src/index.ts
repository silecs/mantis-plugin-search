import m from "mithril"

import SearchText from "./search-text"
import SelectProject from "./select-project"
import SelectCategory from "./select-category"
import SelectStatus from "./select-status"
import TicketTable from "./ticket-table"

import state from "./state"
import { loadIssues, loadProjects, loadAvailableStatus } from "./loaders"
import { SEARCH_ROUTE, UrlAttrs } from "./routes"

function onSubmit() {
    loadIssues()
    return false
}

const SearchForm: m.Component<UrlAttrs> = {
    oninit(vnode) {
        loadAvailableStatus()
        .then(loadProjects)
        .then(function() {
            if (vnode.attrs.projectId) {
                state.filter.setProjectId(parseInt(vnode.attrs.projectId))
                state.filter.setCategoryId(parseInt(vnode.attrs.categoryId))
                if (vnode.attrs.statusIds !== "-") {
                    state.filter.setStatusIds(vnode.attrs.statusIds.split(/,/).map(x => parseInt(x)))
                }
                if (vnode.attrs.searchText !== "-") {
                    state.filter.searchText = vnode.attrs.searchText
                }
                loadIssues()
            }
        })
    },
    view() {
        return m('.col-xs-12',
            m('form.form-horizontal', {onsubmit: onSubmit},
                m(SelectProject),
                m(SelectCategory),
                m(SelectStatus),
                m(SearchText),
                m("div.form-group",
                    m("div.col-sm-offset-2.col-sm-10",
                        m("button.btn.btn-primary",
                            {
                                type: "button",
                                onclick: onSubmit,
                            }, "Rafraîchir la liste de tickets"
                )))
            ),
            m(TicketTable),
        )
    }
}

const root = document.getElementById('search-container')
if (root === null) {
    document.body.innerHTML = "#search-container is missing, coding error."
} else {
    const routes = {'/': SearchForm} as any
    routes[SEARCH_ROUTE] = SearchForm
    m.route(root, '', routes)
}
