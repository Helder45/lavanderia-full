import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([
    'Caminhada',
    'Estudar',
    'Trabalhar',
    'Descansar',
  ]);
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: '',
  });

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex((task) => task === editTask.task);
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input;
    setTasks(allTasks);

    setEditTask({
      enabled: false,
      task: '',
    });

    setInput('');
    localStorage.setItem('register', JSON.stringify(allTasks));
  }

  function handleEdit(item) {
    setInput(item);
    setEditTask({
      enabled: true,
      task: item,
    });
  }

  function handleRegister() {
    if (!input) {
      return;
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks((tarefas) => [...tarefas, input]);
    setInput('');

    localStorage.setItem('register', JSON.stringify([...tasks, input]));
  }

  function handleDelete(item) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);

    localStorage.setItem('register', JSON.stringify(removeTask));
  }

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('register');

    if (tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }
  }, []);

  return (
    <>
      <h1>Lista de Tarefas</h1>

      <button onClick={handleRegister}>
        {editTask.enabled ? 'Alterar' : 'Adicionar'}
      </button>

      <hr />
      {tasks.map((item) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleDelete(item)}>Remover</button>
          <button onClick={() => handleEdit(item)}>Editar</button>
        </section>
      ))}
    </>
  )
}

export default App
