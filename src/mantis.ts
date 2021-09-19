export type Project = {
    id: number;
    name: string;
    status: Status;
    description: string;
    enabled: boolean;
    categories: Category[];
    versions: [];
}

export type Issue = {
    id: number;
    summary: string;

    project: {
        id: number;
        name: string;
    };
    category: Category;

    status: Status;
    resolution: Rank;
    priority: Rank;
    severity: Rank;
    reproductibility: Rank;
    updated_at: string;

    reporter: User;
    handler: User;
}

export type Category = {
    id: number;
    name: string;
}

export type Status = {
    id: number;
    name: string;
    label: string;
}

export type User = {
    id: number;
    name: string;
    realname: string;
    email: string;
}

export type Filter = {
    project_id?: number[];
    category_id?: string[] | [-2]; // category names, or no category
    status?: number[];
}

type Rank = {
    id: number;
    name: string;
    label: string;
}
