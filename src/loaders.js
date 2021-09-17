import m from "mithril"
import state from "./state"
import Project from "./response/project"
import Issue from "./response/issue"
import Status from "./response/status"
import { updateRoute } from "./routes"

function loadProjects() {
    if (state.loading) {
        return;
    }
    state.loading = true
    return m.request({
        method: "GET",
        url: "/api/rest/projects",
        withCredentials: true, // send cookies
    })
    .then(function(data) {
        state.available.projects = []
        for (let p of data.projects) {
            state.available.projects.push(
                Object.assign(new Project(), p)
            )
        }
    })
    .finally(function() {
        state.loading = false
    })
}

function loadIssues() {
    if (state.loading) {
        return;
    }
    state.loading = true
    return m.request({
        method: "GET",
        url: "/api/rest/issues",
        params: formatFilter(state.filter),
        withCredentials: true, // send cookies
    })
    .then(function(data) {
        state.issues = []
        for (let x of data.issues) {
            state.issues.push(
                (new Issue()).fromApiResponse(x)
            )
        }
        updateRoute()
    })
    .finally(function() {
        state.loading = false
    })
}

function loadAvailableStatus() {
    return m.request({
        method: "GET",
        url: "/api/rest/config?option[]=status_enum_string",
        withCredentials: true, // send cookies
    })
    .then(function(data) {
        state.available.status = []
        for (let s of data.configs[0].value) {
            state.available.status.push(
                Object.assign(new Status(), s)
            )
        }
    })
}

function formatFilter(f) {
    const res = {}

    if (f.projectId) {
        res.project_id = [f.projectId]
    }

    if (f.categoryId === -2) { // tickets with no category
        res.category_id = [f.categoryId]
    } else if (f.categoryId > 0) {
        for (let c of state.available.categories) {
            if (f.categoryId === c.id) {
                res.category_id = [c.name]
                break
            }
        }
        //res.category_id = [f.categoryId]
    }

    if (f.statusIds.length > 0) {
        res.status = f.statusIds
    }
    return {filter: res}
}

export {
    loadAvailableStatus,
    loadProjects,
    loadIssues,
}
