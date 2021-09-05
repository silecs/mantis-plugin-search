import m from "mithril"
import state from "./state"

function onChange(event) {
    state.filter.setCategoryId(event.target.value)
}

const SelectCategory = {
    view() {
        return m('.form-group',
            m('label.control-label.col-sm-2', {"for": "filter-category"}, "Catégorie"),
            m('.col-sm-10',
                m('select.form-control', {onchange: onChange},
                    state.available.getCategoryList().map(function(c) {
                        return m('option', {value: c.id}, c.name)
                    })
                )
            )
        )
    }
}

export default SelectCategory