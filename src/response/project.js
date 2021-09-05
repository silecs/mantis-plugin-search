import Category from "./category"

class Project {
    constructor() {
        this.id = 0
        this.name = ""
        this.status = {}
        this.description = ""
        this.enabled = true
        this._categories = []
    }

    get categories() {
        return this._categories
    }
    set categories(cs) {
        const categories = []
        for (let c of cs) {
            if (c instanceof Category) {
                categories.push(c)
            } else {
                categories.push(new Category(c.id, c.name))
            }
        }
        this._categories = categories
    }
}

export default Project
