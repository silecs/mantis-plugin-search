import Category from "./category"

function Rank(data) {
    if (typeof data === 'undefined') {
        return;
    }
    this.id = data.id
    this.name = data.name
    this.label = data.label
}

function User(data) {
    if (typeof data === 'undefined') {
        return;
    }
    this.id = data.id
    this.name = data.name
    this.realName = data.real_name
    this.email = data.email
}

class Issue {
    constructor() {
        this.id = 0
        this.project = {
            id: 0,
            name: "",
        }
        this.category = new Category()
        this.summary = ""

        this.status = new Rank()
        this.status.color = ""
        this.priority = new Rank()
        this.severity = new Rank()
        this.resolution = new Rank()

        this.reporter = new User()
        this.handler = new User()

        this.lastUpdated = new Date()
    }

    fromApiResponse(data) {
        this.id = data.id
        this.project = data.project
        this.category = new Category(data.category.id, data.category.name)
        this.summary = data.summary

        this.status = new Rank(data.status)
        this.priority = new Rank(data.priority)
        this.severity = new Rank(data.severity)
        this.resolution = new Rank(data.resolution)

        this.reporter = new User(data.reporter)
        this.handler = new User(data.handler)

        this.lastUpdated = new Date(data.updated_at)

        return this
    }
}

export default Issue
