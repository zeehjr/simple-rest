import express from "express";
const app = express();

app.use(express.json());

function createId() {
  return Math.floor(Math.random() * 99999);
}

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const tasks: Task[] = [];

app.get("/", (req, res) => {
  res.status(200).json(tasks);
});

app.post("/", (req: any, res: any) => {
  const task = { id: createId(), ...req.body } as Task;

  tasks.push(task);

  return res.sendStatus(201).json(task);
});

app.put("/:id", (req: any, res: any) => {
  const taskId = Number(req.params.id);

  const task = { id: taskId, ...req.body } as Task;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.sendStatus(404);
  }

  tasks[taskIndex] = task;

  return res.sendStatus(200).json(task);
});

app.delete("/:id", (req: any, res: any) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.sendStatus(404);
  }

  tasks.splice(taskIndex, 1);

  return res.sendStatus(200);
});

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
