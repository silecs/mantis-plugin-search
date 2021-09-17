import m from "mithril"
import state from "./state"

function updateRoute() {
    m.route.set(
        '/p/:projectId/c/:categoryId/s/:statusIds',
        {
            projectId: state.filter.projectId,
            categoryId: state.filter.categoryId,
            statusIds: state.filter.statusIds.join(','),
        }
    )
}

export {
    updateRoute,
}
