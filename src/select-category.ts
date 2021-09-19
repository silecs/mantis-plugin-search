import m from "mithril"
import state from "./state"

function onChange(event: Event) {
    const target = event.target as HTMLInputElement
    state.filter.setCategoryId(parseInt(target.value))
}

const SelectCategory: m.Component<void> = {
    view() {
        return m('.form-group',
            m('label.control-label.col-sm-2', {"for": "filter-category"}, "Catégorie"),
            m('.col-sm-10',
                m('select.form-control', {onchange: onChange, disabled: state.available.categories.length === 0},
                    state.available.getCategoryList().map(function(c) {
                        return m('option', {value: c.id, selected: c.id === state.filter.categoryId}, c.name)
                    })
                )
            )
        )
    }
}

export default SelectCategory
