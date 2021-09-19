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

function loadProjects(): Promise<void> {
    if (state.loading) {
        return;
    }
    state.loading = true
    return m.request({
        method: "GET",
        url: "/api/rest/projects",
        withCredentials: true, // send cookies
    })
    .then(function(data: ProjectsResponse) {
        state.available.projects = data.projects
    })
    .finally(function() {
        state.loading = false
    })
}

function loadIssues(): Promise<void> {
    if (state.loading) {
        return;
    }
    state.loading = true
    return m.request({
        method: "GET",
        url: "/api/rest/issues",
        params: {filter: state.filter.formatForMantis()},
        withCredentials: true, // send cookies
    })
    .then(function(data: IssuesResponse) {
        state.issues = data.issues
        updateRoute()
    })
    .finally(function() {
        state.loading = false
    })
}

function loadAvailableStatus(): Promise<void> {
    return m.request({
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
}

export {
    loadAvailableStatus,
    loadProjects,
    loadIssues,
}
