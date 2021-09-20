import m from "mithril"
import state from "./state"

function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    state.filter.searchText = target.value
}

export default {
    view() {
        return m('.form-group',
            m('label.control-label.col-sm-2', {"for": "filter-search-text"}, "Texte cherché"),
            m('.col-sm-10',
                m("input.form-control", {type: "search", oninput: onInput, id: "filter-search-text"})
            )
        )
    }
} as m.Component<void>
