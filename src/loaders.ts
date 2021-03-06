import m from "mithril"
import state from "./state"
import { updateRoute } from "./routes"
import * as Mantis from "./mantis"

type ProjectsResponse = {
    projects: Mantis.Project[];
}
type IssuesResponse = {
    issues: Mantis.Issue[];
}
type ConfigResponse = {
    configs: Array<{value: Mantis.Status[]}>;
}

let loadingProjects: Promise<void>
function loadProjects(): Promise<void> {
    if (state.available.projects.length > 0) {
        return Promise.resolve()
    }
    if (loadingProjects) {
        return loadingProjects
    }
    loadingProjects = m.request({
        method: "GET",
        url: "/api/rest/projects",
        withCredentials: true, // send cookies
    })
    .then(function(data: ProjectsResponse) {
        state.available.projects = data.projects
        state.filter.setCategoryId(-1)
    })
    .finally(function() {
        state.loading = false
    })
    return loadingProjects
}

function loadIssues(): Promise<void> {
    return m.request({
        method: "GET",
        url: "/api/rest/issues",
        params: {filter: state.filter.formatForMantis()},
        withCredentials: true, // send cookies
    }).then(function(data: IssuesResponse) {
        state.issues = data.issues
        updateRoute()
    })
}

let loadingStatuses: Promise<void>
function loadAvailableStatus(): Promise<void> {
    if (state.available.status.length > 0) {
        return Promise.resolve()
    }
    if (loadingStatuses) {
        return loadingStatuses
    }
    loadingStatuses = m.request({
        method: "GET",
        url: "/api/rest/config?option[]=status_enum_string",
        withCredentials: true, // send cookies
    })
    .then(function(data: ConfigResponse) {
        state.available.status = []
        for (let s of data.configs[0].value) {
            state.available.status.push(s)
        }
    })
    return loadingStatuses
}

export {
    loadAvailableStatus,
    loadProjects,
    loadIssues,
}
