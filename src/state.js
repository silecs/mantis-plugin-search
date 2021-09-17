import Category from "./response/category"
import Project from "./response/project"

const ANY = -1
const NONE = -2

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
    status: [],
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
            return false;
        }
        const oldId = filter.projectId
        const id = parseInt(value)
        filter.projectId = (id >= NONE ? id : ANY)
        if (oldId !== filter.projectId) {
            filter.categoryId = ANY
            setAvailableCategories(filter.projectId)
            return true
        }
        return false
    },
    categoryId: ANY,
    setCategoryId(value) {
        if (state.loading) {
            return false;
        }
        const oldId = filter.categoryId
        const id = parseInt(value)
        filter.categoryId = (id >= NONE ? id : ANY)
        return (oldId !== filter.categoryId)
    },
    statusIds: [],
    setStatusIds(values) {
        const oldIds = filter.statusIds
        filter.statusIds = values.map(x => parseInt(x)).filter(x => x > 0).sort((a, b) => a - b)
        return !haveSameContent(oldIds, filter.statusIds)
    }
}

function haveSameContent(array1, array2) {
    if (array1.length !== array2.length) {
        return false
    }
    return array1.every((value, index) => (value === array2[index]))
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
