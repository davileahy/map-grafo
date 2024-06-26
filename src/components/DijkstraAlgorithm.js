import React, { useState } from 'react';
import { findPath } from '../algorithms/dijkstra';
import { Search } from 'react-feather';

const DijkstraAlgorithm = ({ nodes, edges }) => {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [path, setPath] = useState(null);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const graph = {};
    edges.forEach(edge => {
      if (!graph[edge.from]) {
        graph[edge.from] = {};
      }
      graph[edge.from][edge.to] = edge.weight;
    });

    try {
      const shortestPath = findPath(graph, startNode, endNode);
      if (shortestPath.length === 0) {
        setErrorAlert(true);
        setPath(null);
      } else {
        setPath(shortestPath);
        setErrorAlert(false);
      }
    } catch (error) {
      setErrorAlert(true);
      console.error('Erro ao achar caminho:', error);
    }
  };

  return (
    <div>
      <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit}>
        <div className='flex flex-row justify-center items-center gap-[30px]'>
          <select value={startNode} onChange={(e) => setStartNode(e.target.value)} className='select select-accent w-full max-w-xs'>
            <option value="">Nó Inicial</option>
            {nodes.map((node, index) => (
              <option key={index} value={node}>{node}</option>
            ))}
          </select>

          <select value={endNode} onChange={(e) => setEndNode(e.target.value)} className='select select-accent w-full max-w-xs'>
            <option value="">Nó Final</option>
            {nodes.map((node, index) => (
              <option key={index} value={node}>{node}</option>
            ))}
          </select>

        </div>
        
        <button type="submit" className='btn btn-accent'>Encontrar o Caminho Mais Curto <Search/></button>
        
      </form>

      {errorAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Erro:</strong>
          <span className="block sm:inline"> Nenhum caminho encontrado entre os nós selecionados.</span>
        </div>
      )}
      {path && path.length > 0 && (
        <div>Menor Caminho: {path.join(' -> ')}</div>
      )}
    </div>
  );
};

export default DijkstraAlgorithm;
