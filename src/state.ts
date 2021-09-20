import * as Mantis from "./mantis"

const ANY = -1
const NONE = -2

interface Available {
    projects: Mantis.Project[];
    categories: Mantis.Category[];
    status: Mantis.Status[];
    getProjectList: () => {id: number, name: string}[];
    getCategoryList: () => {id: number, name: string}[];
}

const available: Available = {
    projects: [],
    getProjectList() {
        const all = [
            {id: ANY, name: "Tous"}
        ]
        for (const p of available.projects) {
            all.push(p)
        }
        return all
    },
    categories: [],
    status: [],
    getCategoryList() {
        if (available.categories.length === 0) {
            return []
        }
        const all = [
            {id: ANY, name: "Toutes"},
            {id: NONE, name: "Aucune"},
        ]
        for (const c of available.categories) {
            all.push(c)
        }
        return all
    },
}

interface Filter {
    projectId: number;
    categoryId: number;
    statusIds: number[];
    searchText: string;
    setProjectId: (id: number) => boolean;
    setCategoryId: (id: number) => boolean;
    setStatusIds: (ids: number[]) => boolean;
    formatForMantis: () => Mantis.Filter;
}

const filter: Filter = {
    projectId: ANY,
    setProjectId(id) {
        if (state.loading) {
            return false;
        }
        const oldId = filter.projectId
        filter.projectId = (id >= NONE ? id : ANY)
        if (oldId !== filter.projectId) {
            filter.categoryId = ANY
            setAvailableCategories(filter.projectId)
            return true
        }
        return false
    },
    categoryId: ANY,
    setCategoryId(id) {
        if (state.loading) {
            return false;
        }
        const oldId = filter.categoryId
        filter.categoryId = (id >= NONE ? id : ANY)
        return (oldId !== filter.categoryId)
    },
    statusIds: [],
    setStatusIds(ids) {
        const oldIds = filter.statusIds
        filter.statusIds = ids.filter(x => x > 0).sort((a, b) => a - b)
        return !haveSameContent(oldIds, filter.statusIds)
    },
    searchText: "",
    formatForMantis() {
        const res: Mantis.Filter = {}
    
        if (this.projectId) {
            res.project_id = [this.projectId]
        }
    
        if (this.categoryId === -2) { // tickets with no category
            res.category_id = [-2]
        } else if (this.categoryId > 0) {
            for (let c of state.available.categories) {
                if (this.categoryId === c.id) {
                    res.category_id = [c.name]
                    break
                }
            }
        }

        if (this.searchText !== "") {
            res.search = this.searchText
        }

        if (this.statusIds.length > 0) {
            res.status = this.statusIds
        }
        return res
    },
}

function haveSameContent<Type>(array1: Type[], array2: Type[]): boolean {
    if (array1.length !== array2.length) {
        return false
    }
    return array1.every((value, index) => (value === array2[index]))
}

function setAvailableCategories(projectId: number) {
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
    issues: [] as Mantis.Issue[],
    loading: false,
}

export default state
