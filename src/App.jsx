import { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

import './App.css';

function App() {
  const [contador, setContador] = useState(0);
  const [client, setClient] = useState('');
  const [servico, setServico] = useState('');
  const [status, setStatus] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [editPedido, setEditPedido] = useState({
    enabled: false,
    pedido: null
  });

  function aumentarContador() {
    setContador(contador + 1);
    return contador;
  }

  function resetarFormulario() {
    setClient('');
    setServico('');
    setStatus('pendente');
    setEditPedido({
      enabled: false,
      pedido: null,
    });
  }

  function handleSaveEdit(pedidoAtualizado) {
    console.log("pedido atualizado", pedidoAtualizado.id);
    pedidos.map(pedido => (console.log(pedido.id)
    ))

    const pedidosAtualizados = pedidos.map(pedido => (pedido.id == pedidoAtualizado.id ? pedidoAtualizado : pedido))
    console.log("pedidos atualizados ", pedidosAtualizados);

    setPedidos(pedidosAtualizados);
    resetarFormulario();

  }

  function handleEdit(pedido) {
    setClient(pedido.client);
    setServico(pedido.servico);
    setStatus(pedido.status);
    setEditPedido({
      enabled: true,
      pedido
    });
  }

  function handleRegister() {
    if (!client || !servico) {
      return;
    }

    const novoPedido = {
      id: (editPedido.enabled ? editPedido.pedido.id : aumentarContador()),
      client,
      servico,
      status
    };

    if (editPedido.enabled && editPedido.pedido) {
      handleSaveEdit(novoPedido);
      return;
    }

    const novosPedidos = [...pedidos, novoPedido];
    setPedidos(novosPedidos);
    resetarFormulario();

  }

  function handleDelete(id) {
    const removePedido = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(removePedido);

  }

  return (
    <>
      <h1>Lista de Pedidos</h1>

      <div className='coluna'>
        <input
          type="text"
          value={client}
          onChange={(event) => setClient(event.target.value)}
          placeholder="Digite o nome do cliente"
        />
        <input
          type="text"
          value={servico}
          onChange={(event) => setServico(event.target.value)}
          placeholder="Digite o tipo de serviço"
        />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluído">Concluído</option>
          {/* <option value="Encaminhado para entrega">Emcaminhado para entrega</option> */}
        </select>
        <button onClick={handleRegister}>
          {editPedido.enabled ? 'Alterar Pedido' : 'Adicionar Pedido'}
        </button>
      </div>

      <hr />
      {pedidos.map((pedido) => (
        <section key={pedido.id}>
          <span>{pedido.client}, {pedido.servico}, {pedido.status}</span>
          <button onClick={() => handleDelete(pedido.id)}>Remover</button>
          <button onClick={() => handleEdit(pedido)}>Editar</button>
        </section>
      ))}
    </>
  );
}

export default App;
