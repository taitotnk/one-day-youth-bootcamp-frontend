import React, { useCallback } from "react";
import { Task } from "../";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTaskLabel: string;
  setNewTaskLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const TaskForm: React.FC<Props> = ({
  tasks,
  setTasks,
  newTaskLabel,
  setNewTaskLabel,
}) => {
  // フォームの値を保持する
  const handleNewTaskLabel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskLabel(e.target.value);
    },
    [setNewTaskLabel]
  );

  // Taskの登録
  const handleAddTask = () => {
    const newTask = { label: newTaskLabel, isDone: false };
    setTasks([...tasks, newTask]);
    setNewTaskLabel("");
  };

  // 完了したTaskを削除する
  const handleClearTasks = useCallback(() => {
    const newTasks = tasks.filter((task) => !task.isDone);
    setTasks(newTasks);
  }, [tasks]);

  // Taskを完了するものを格納する
  const doneTasks = tasks.filter((task) => task.isDone);

  return (
    <>
      <input
        onChange={handleNewTaskLabel}
        type={"text"}
        value={newTaskLabel}
        placeholder="Enter the task"
      />
      {newTaskLabel === "" ? (
        <button onClick={handleAddTask} disabled={true}>
          Add
        </button>
      ) : (
        <button onClick={handleAddTask}>Add</button>
      )}
      <br />

      {doneTasks.length > 0 ? (
        <button onClick={handleClearTasks}>Clear</button>
      ) : (
        <button onClick={handleClearTasks} disabled={true}>
          Clear
        </button>
      )}
    </>
  );
};
