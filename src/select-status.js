import m from "mithril"
import state from "./state"

function onChange(event) {
    let result = []
    let checkboxes = event.target.closest("div.form-control").querySelectorAll('input[type="checkbox"]')
    for (let c of checkboxes) {
        if (c.checked) {
            result.push(parseInt(c.getAttribute("data-id")))
        }
    }
    state.filter.setStatusIds(result)
}

const SelectStatus = {
    view() {
        return m('.form-group',
            m('label.control-label.col-sm-2', "Statuts"),
            m('.col-sm-10',
                m('div.form-control', {onchange: onChange},
                    state.available.status.map(function(s) {
                        return m('label.checkbox-inline',
                            m('input', {type: "checkbox", name:"status-" + s.id, value: "1", checked: state.filter.statusIds.includes(s.id), "data-id": s.id}),
                            s.label
                        )
                    })
                )
            )
        )
    }
}

export default SelectStatus
