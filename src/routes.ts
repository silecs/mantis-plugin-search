import m from "mithril"
import state from "./state"

interface UrlAttrs {
    projectId: string;
    categoryId: string;
    statusIds: string;
    searchText: string;
}

interface StateAttrs {
    projectId: number;
    categoryId: number;
    statusIds: number[];
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

function parseUrlAttrs(attrs: UrlAttrs): StateAttrs {
    return {
        projectId: parseInt(attrs.projectId) || -1,
        categoryId: parseInt(attrs.categoryId) || -1,
        statusIds: attrs.statusIds === "-" ? [] : attrs.statusIds.split(/,/).map(x => parseInt(x)),
        searchText: attrs.searchText === "-" ? "" :  attrs.searchText
    }
}

export {
    SEARCH_ROUTE,
    UrlAttrs,
    parseUrlAttrs,
    updateRoute,
}
