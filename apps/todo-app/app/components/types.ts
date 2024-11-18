export interface TodoEachItem {
        id: number
        text: string
        completed: boolean
        createdAt: string
}

export interface TodoItemTypes {
    task: TodoEachItem
}