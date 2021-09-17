import m from "mithril"
import state from "./state"

function updateRoute() {
    m.route.set(
        '/p/:projectId/c/:categoryId',
        {
            projectId: state.filter.projectId,
            categoryId: state.filter.categoryId
        }
    )
}

export {
    updateRoute,
}
