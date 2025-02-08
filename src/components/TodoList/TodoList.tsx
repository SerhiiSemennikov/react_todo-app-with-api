import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../App.scss';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  processings: number[];
  isTodoLoading: boolean;
  isTodoDeleting: boolean;
  creatingTodo: boolean;
  toggleTodoStatus: (id: number, completed: boolean) => void;
  editTodo: (todoId: number, newTitle: string) => void;
  setErrorMessage: (error: ErrorMessage) => void;
  loadingTodoId: number | null;
};

export const TodoList: React.FC<Props> = props => {
  const {
    todos,
    tempTodo,
    onDelete,
    isTodoLoading,
    isTodoDeleting,
    creatingTodo,
    processings,
    toggleTodoStatus,
    editTodo,
    setErrorMessage,
    loadingTodoId,
  } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos &&
          todos.map(todo => (
            <CSSTransition key={todo.id} timeout={3000} classNames="item">
              <TodoItem
                key={todo.id}
                todo={todo}
                tempTodo={tempTodo}
                onDelete={onDelete}
                isTodoLoading={isTodoLoading}
                isTodoDeleting={isTodoDeleting}
                isProcessed={processings.includes(todo.id)}
                toggleTodoStatus={toggleTodoStatus}
                editTodo={editTodo}
                setErrorMessage={setErrorMessage}
                loadingTodoId={loadingTodoId}
              />
            </CSSTransition>
          ))}
        {tempTodo && (
          <CSSTransition key={0} timeout={3000} classNames="temp-item">
            <TodoItem
              key={0}
              todo={tempTodo}
              tempTodo={tempTodo}
              onDelete={() => {}}
              isTodoLoading={isTodoLoading}
              isTodoDeleting={isTodoDeleting}
              isProcessed={processings.includes(tempTodo.id)}
              toggleTodoStatus={toggleTodoStatus}
              editTodo={editTodo}
              setErrorMessage={setErrorMessage}
              loadingTodoId={loadingTodoId}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
      {creatingTodo && `  creating...`}
    </section>
  );
};
