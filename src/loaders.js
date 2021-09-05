import m from "mithril"
import state from "./state"
import Project from "./response/project"

function loadProjects() {
    if (state.loading) {
        return;
    }
    state.loading = true
    m.request({
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

export {
    loadProjects,
}
