export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
  
export interface TodoInputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    handleAddTodo: () => void;
}
  
export interface TodoItemProps {
    item: Todo;
    isTodo: boolean;
    handleToggle: (id: number, isTodo: boolean) => void;
    handleDelete: (id: number, isTodo: boolean) => void;
    startEditing?: (id: number) => void;
    saveEditing?: () => void;
    cancelEditing?: () => void;
    editingTodoId?: number | null;
    editingText?: string;
    setEditingText?: (text: string) => void;
}
  
export interface TodoListProps {
    todos: Todo[];
    done: Todo[];
    handleToggle: (id: number, isTodo: boolean) => void;
    handleDelete: (id: number, isTodo: boolean) => void;
    editingTodoId: number | null;
    editingText: string;
    setEditingText: (text: string) => void;
    startEditing: (id: number) => void;
    saveEditing: () => void;
    cancelEditing: () => void;
}