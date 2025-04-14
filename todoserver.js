const express = require ("express");
const cors = require ("cors");

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000

const todos =[];


app.get("/todo", (req, res) => {
    res.json(todos);
});

app.post("/todo", (req, res) =>{
    const {title,task,description,complete} = req.body;
    const todo = {id: todos.length + 1, title,task,description,complete};
    todos.push(todo);
    
   if (!todo) {
        res.status(404).json({err:"todo not available"})
    };

    
    res.json(todo);
});

app.get("/todo/:id",(req,res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    
   if (!todo) {
    res.status(404).json({err:"todo not available"})}

    res.json(todo);
})

app.delete("/todo/:id", (req, res) => 
    {
    const id = parseInt(req.params.id);

    const index = todos.findIndex(todo => todo.id === id);

    const deleteTodo = todos.splice(index, 1)[0];

    
    res.json({message:"todo deleted", todo:"deletedTodo"});

    if(!deleteTodo) {
        res.status(404).json({error:"todo not found"});git
    }
   
});



app.patch("/todo/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    const {task,title,description} = req.body;
    if(task) todo.task = task;
    if(title) todo.title = title;
    if(description) todo.description = description;

    res.json({message:"todo updated", todo});


})


app.listen(port, () => {
    console.log("running on port 5000")
});

