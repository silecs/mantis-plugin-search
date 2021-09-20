import m from "mithril"
import state from "./state"

function updateRoute(): void {
    const attrs = {
        projectId: state.filter.projectId.toString(),
        categoryId: state.filter.categoryId.toString(),
        statusIds: state.filter.statusIds.join(',') || "-",
        searchText: state.filter.searchText || "-",
    }
    m.route.set('/p/:projectId/c/:categoryId/s/:statusIds/t:searchText', attrs)
}

export {
    updateRoute,
}
