import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model/todo';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { TodoList } from './TodoList';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
}
export const TodoCard: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
        setEdit(false);
    };

    useEffect(() => {
      
      inputRef.current?.focus();
    
    }, [edit]);
    
    return (
      <Draggable draggableId={todo.id.toString()} index={index}>
        {
          (provided, snapshot)=>(
        <form 
        className={`todo-card ${snapshot.isDragging ? "dragging" : ""}`} 
        onSubmit={(e) => handleSubmit(e, todo.id)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
            {edit ? (
                <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todo-card--text" />
            ) : todo.isDone ? (
                <s className="todo-card--text">{todo.todo}</s>
            ) : (
                <span className="todo-card--text">{todo.todo}</span>
            )}
            <div>
                <span
                    className="icon"
                    onClick={(e) => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit);
                        }
                    }}
                >
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
          )
        }
      </Draggable>
    );
};
