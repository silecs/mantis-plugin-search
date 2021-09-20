import m from "mithril"
import state from "./state"

interface UrlAttrs {
    projectId: string;
    categoryId: string;
    statusIds: string;
    searchText: string;
}

const SEARCH_ROUTE = '/p/:projectId/c/:categoryId/s/:statusIds/t/:searchText'

function updateRoute(): void {
    const attrs: UrlAttrs = {
        projectId: state.filter.projectId.toString(),
        categoryId: state.filter.categoryId.toString(),
        statusIds: state.filter.statusIds.join(',') || "-",
        searchText: state.filter.searchText.trim() || "-",
    }
    m.route.set(SEARCH_ROUTE, attrs)
}

export {
    SEARCH_ROUTE,
    UrlAttrs,
    updateRoute,
}
