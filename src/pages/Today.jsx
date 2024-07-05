import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingText(task.title);
  };

  const saveEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingText } : task
      )
    );
    setEditingTask(null);
    setEditingText("");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                {editingTask === task.id ? (
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => saveEditing(task.id)}
                    autoFocus
                  />
                ) : (
                  <span>{task.title}</span>
                )}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => startEditing(task)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex space-x-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New task"
              />
              <Button onClick={addTask}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Today;