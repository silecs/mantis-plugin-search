import m from "mithril"
import state from "./state"

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

export default SelectProject
