import m from "mithril"
import state from "./state"

function onChange(event) {
    state.filter.setProjectId(event.target.value)
}

const SelectProject = {
    view() {
        return m('.form-group',
            m('label.control-label.col-sm-2', {"for": "search-project"}, "Projet"),
            m('.col-sm-10',
                m('select.form-control', {onchange: onChange},
                    state.available.getProjectList().map(function(p) {
                        return m('option', {value: p.id}, p.name)
                    })
                )
            )
        )
    }
}

export default SelectProject
