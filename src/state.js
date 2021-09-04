const ANY = -1
const NONE = 0

const state = {
    projectId: 0,
    setProjectId(value) {
        const oldId = state.projectId
        const id = parseInt(value)
        state.projectId = (id >= NONE ? id : ANY)
        if (oldId !== state.projectId) {
            state.categoryId = ANY
        }
        console.log(state)
    },
    categoryId: ANY,
}

export default state
