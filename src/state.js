import Category from "./response/category"
import Project from "./response/project"

const ANY = -1
const NONE = 0

const available = {
    projects: [],
    getProjectList() {
        const all = [
            Object.assign(new Project(), {id: ANY, name: "Tous"})
        ]
        for (const p of available.projects) {
            all.push(p)
        }
        return all
    },
    categories: [],
    getCategoryList() {
        const all = [
            new Category(ANY, "Toutes"),
            new Category(NONE, "Aucune"),
        ]
        for (const c of available.categories) {
            all.push(c)
        }
        return all
    },
}

const filter = {
    projectId: ANY,
    setProjectId(value) {
        if (state.loading) {
            return;
        }
        const oldId = filter.projectId
        const id = parseInt(value)
        filter.projectId = (id >= NONE ? id : ANY)
        if (oldId !== filter.projectId) {
            filter.categoryId = ANY
            setAvailableCategories(filter.projectId)
        }
        console.log(state)
    },
    categoryId: ANY,
    setCategoryId(value) {
        if (state.loading) {
            return;
        }
        const id = parseInt(value)
        filter.categoryId = (id >= NONE ? id : ANY)
        console.log(state)
    },
}

function setAvailableCategories(projectId) {
    console.log("setCat", projectId)
    if (projectId === NONE || projectId === ANY) {
        available.categories = []
        return true
    }
    for (let p of available.projects) {
        if (p.id === projectId) {
            available.categories = p.categories
            return true
        }
    }
    // Bad project ID
    available.categories = []
    return false
}

const state = {
    available,
    filter,
    issues: [],
    loading: false,
}

export default state
