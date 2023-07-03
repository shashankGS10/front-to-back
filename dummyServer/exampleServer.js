// server.js (Backend)
 
const express = require('express'); //we import the express module, which is a popular framework for building web applications in Node.js
const app = express(); //We create an instance of the express application by calling express(). This instance represents our web application.
const port = 3000; //We define the port number on which our server will listen for incoming requests. In this case, we set it to 3000, but you can choose any available port number.

app.use(express.json());

// Sample data for todos
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build CRUD APIs', completed: false },
];

// READ - Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// CREATE - Add a new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE - Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find(todo => todo.id === Number(id));
  if (todo) {
    todo.title = title || todo.title;
    todo.completed = completed || todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== Number(id));
  res.sendStatus(204);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
