import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model/todo';
import './styles.css';
import { TodoCard } from './TodoCard';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="container">
            <Droppable droppableId="todosList">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Active Tasks</span>
                        {todos.map((todo, index) => <TodoCard index={index} key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="todosCompleted">
                {(provided, snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete":""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Completed Tasks</span>
                        {completedTodos.map((todo, index) => (
                            <TodoCard  index={index} key={todo.id} todo={todo} todos={completedTodos} setTodos={setCompletedTodos} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
