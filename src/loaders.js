import m from "mithril"
import state from "./state"
import Project from "./response/project"
import Issue from "./response/issue"

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
    })
    .finally(function() {
        state.loading = false
    })
}

function formatFilter(f) {
    const res = {}
    // TODO deal with ANY and ALL
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
    return {filter: res}
}

export {
    loadProjects,
    loadIssues,
}
