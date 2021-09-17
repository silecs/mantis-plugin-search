import m from "mithril"
import state from "./state"
import { updateRoute } from "./routes"

function onChange(event) {
    if (state.filter.setProjectId(event.target.value)) {
        updateRoute()
    }
}

const SelectProject = {
    view() {
        return m('.form-group',
            m('label.control-label.col-sm-2', {"for": "search-project"}, "Projet"),
            m('.col-sm-10',
                m('select.form-control', {onchange: onChange},
                    state.available.getProjectList().map(function(p) {
                        return m('option',
                            {value: p.id, selected: p.id === state.filter.projectId},
                            p.name
                        )
                    })
                )
            )
        )
    }
}

export default SelectProject
