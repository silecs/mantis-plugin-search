import m from "mithril"
import state from "./state"
import * as Mantis from "./mantis"

function issueToTr(issue: Mantis.Issue) {
    return m("tr.status-" + issue.status.id + "-bg",
        m("td.column-priority", issue.priority.label),
        m("td.column-id", issue.id),
        m("td.column-bugnotes-count", ""),
        m("td.column-category", issue.category.name),
        m("td.column-severity", issue.severity.label),
        m("td.column-status", issue.status.label),
        m("td.column-last-modified", (new Date(issue.updated_at)).toISOString().substring(0, 10)),
        m("td.column-summary", issue.summary),
    )
}

const IssueTableHeader = {
    view() {
        return m("tr.buglist-headers",
            m("th.column-priority", "P"),
            m("th.column-id", "ID"),
            m("th.column-bugnotes-count", ""),
            m("th.column-category", "Catégorie"),
            m("th.column-severity", "Sévérité"),
            m("th.column-status", "État"),
            m("th.column-last-modified", "Mis à jour"),
            m("th.column-summary", "Résumé"),
        )
    }
}

export default {
    view() {
        return m("table#buglist.table.table-bordered.table-condensed.table-hover",
            m("thead",
                m(IssueTableHeader)
            ),
            m("tbody",
                state.issues.map(issueToTr)
            )
        )
    }
} as m.Component<void>
