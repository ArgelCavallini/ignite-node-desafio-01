const express = require('express');
const cors = require('cors');

const {v4:uuid} = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const dados = [];

app.use(express.json());

app.post("/users",(request,response)=>{
  //Pegar dados do body
  const { name , username }  = request.body;

  //Verificar se username já existe
  const usesrnameAlreadyExists = dados.some(
    (dados) => dados.username === username
  );

  //Se existir (true)
  if(usesrnameAlreadyExists){
    //Retornar aviso informando que já existe
    response.status(400).json({error: "Username already exists!"});
  }

  //Se não existir, realiza o push para o array
  dados.push({
    id:uuid(),
    name,
    username,
    todos: []
  })

  //Retorna
  return response.status(201).send();
});

app.get("/todos",(request,response)=>{
  const { username } = request.headers;

  const dado = dados.find(dado => dado.username === username);

  if(!dado){
    return response.status(400).json({error:"Todos not found!"})
  }

   return response.json(dado.todos);
});

app.post("/todos",(request,response)=>{
  const { username } = request.headers;
  const { title , deadline }  = request.body;

  const dado = dados.find(dado => dado.username === username);

  if(!dado){
    return response.status(400).json({error:"Todos not found!"})
  }

  dado.todos.push({
    id:uuid(),
    title,
    done:false,
    deadline: new Date(deadline),
    created_at: new Date()
  })

  return response.status(201).send();

});

app.put("todos/:id", (request,response)=>{
  const { username } = request.headers;
  const { id } = request.params;
  const { title , deadline }  = request.body;

  const dado = dados.find(dado => dado.username === username);

  if(!dado){
    return response.status(400).json({error:"Todos not found!"})
  }

  const edit = dado.todos(find(edit => edit.id === id));
  if(!edit){
    return response.status(400).json({error:"Todos edit not found!"})
  }

  if(title != ''){
    edit.title = title;
  }
  if(deadline != ''){
    edit.deadline = deadline;
  }

  return response.status(201).send();
});

app.patch("todos/:id/done", (request,response)=>{
    const { username } = request.headers;
    const { id } = request.params;

    const dado = dados.find(dado => dado.username === username);

    if(!dado){
      return response.status(400).json({error:"Todos not found!"})
    }

    const edit = dado.todos(find(edit => edit.id === id));
    if(!edit){
      return response.status(400).json({error:"Todos edit not found!"})
    }

    edit.done = true;
  
    return response.status(201).send(todo);

});

app.delete("todos/:id",(request,response)=>{
 const { username } = request.headers;
    const { id } = request.params;

    const dado = dados.find(dado => dado.username === username);

    if(!dado){
      return response.status(400).json({error:"Todos not found!"})
    }

    const edit = dado.todos(find(edit => edit.id === id));
    if(!edit){
      return response.status(400).json({error:"Todos edit not found!"})
    }
  
  //splice
  edit.splice(edit,1); //ONDE DELETER,QTDE DELETAR

  return response.status(200).json(todos);
});

app.listen(3333, () => {
  console.log('Deu boa!');
});