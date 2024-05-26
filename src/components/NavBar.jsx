import React from 'react';
import { useVisualizerContext } from '../context/VisualizerContext';
import useCounter from './useCounter'; // Adjust the import path as necessary

const NavBar = () => {
  const {
    algorithm,
    setAlgorithm,
    speed,
    setSpeed,
    visualizing,
    setVisualizing,
    nodeVisited,
    shortestNodes,
    clearBoard,
    setClearBoard,
  } = useVisualizerContext();

  const animatedNodeVisited = useCounter(nodeVisited, 5000); // 1 second duration
  const animatedShortestNodes = useCounter(shortestNodes, 5000); // 1 second duration

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleVisualize = () => {
    setVisualizing(true);
  };

  const handleClearBoard = () => {
    setClearBoard(!clearBoard);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="text-xl font-bold text-center">
          Path Visualizer
        </div>
        <div id="visited" className="text-sm mt-1">Nodes Visited: {animatedNodeVisited}</div>
        <div id="short" className="text-sm mt-1">Nodes in Shortest Path: {animatedShortestNodes}</div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative text-center" id="algo">
            <span className="block md:inline-block mr-2">Select Algorithm</span>
            <select
              value={algorithm}
              onChange={handleAlgorithmChange}
              className="bg-gray-700 text-white p-2 rounded w-full md:w-auto"
            >
              <option value="Dijkstra">Dijkstra Algorithm</option>
              <option value="A*">A*</option>
              <option value="Greedy">Greedy Best First Search</option>
              <option value="BFS">BFS</option>
              <option value="DFS">DFS</option>
            </select>
          </div>
          <div className="relative text-center" id="speed">
            <span className="block md:inline-block mr-2">Speed</span>
            <select
              value={speed}
              onChange={handleSpeedChange}
              className="bg-gray-700 text-white p-2 rounded w-full md:w-auto"
            >
              <option value="1">Average</option>
              <option value="5">Slow</option>
              <option value="0.5">Fast</option>
            </select>
          </div>
          <button id="visualize" className="bg-green-500 p-2 rounded hover:bg-green-600 w-full md:w-auto text-center" onClick={handleVisualize}>
            Visualize
          </button>
          <button id="clear" className="relative group bg-red-500 p-2 rounded hover:bg-red-600 w-full md:w-auto text-center disabled:bg-red-300 disabled:hover:bg-red-300 disabled:cursor-not-allowed"
            onClick={handleClearBoard}
            disabled={visualizing}>
            Clear Board
          </button>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
