import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import { useVisualizerContext } from '../context/VisualizerContext';
import Dijkstra from './Algorithm/Dijkstra';
import BestFirstSearch from './Algorithm/BestFirstSearch';
import BFS from './Algorithm/BFS';
import DFS from './Algorithm/DFS';
import AStar from './Algorithm/AStar';
const Grid = ({ rows, cols }) => {
  const { startPoint, setStartPoint, endPoint, setEndPoint, algorithm, visualizing, setVisualizing, speed, clearBoard, setShortestNodes,setNodeVisited} = useVisualizerContext();
  const [grid, setGrid] = useState(() => createInitialGrid(rows, cols, startPoint, endPoint));
  const draggingPoint = useRef(null);
  const animationTimeouts = useRef([]);


  useEffect(() => {
    animationTimeouts.current.forEach(clearTimeout);
    animationTimeouts.current = [];
    const newGrid = createInitialGrid(rows, cols, startPoint, endPoint);
    setGrid(newGrid);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        if (cell) {
          cell.className = 'w-2 h-2 md:w-4 md:h-4 border border-gray-300 bg-white transition duration-500 ease-in-out relative';
        }
      }
    }
  }, [clearBoard]);

  

  useEffect(() => {
    if (visualizing) {
      visualizeAlgorithm();
    }
  }, [visualizing]);

  const handleCellClick = (row, col) => {
    const newGrid = grid.slice();
    const cell = newGrid[row][col];
    newGrid[row][col] = { ...cell, isWall: !cell.isWall };
    setGrid(newGrid);
  };

  const handleDragStart = (e, row, col, isStart, isEnd) => {
    if (isStart) {
      draggingPoint.current = 'start';
    } else if (isEnd) {
      draggingPoint.current = 'end';
    }
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='; // 1x1 pixel transparent image
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  const handleDragEnter = (e, row, col) => {
    e.preventDefault();
    if (draggingPoint.current) {
      const newGrid = grid.slice();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (draggingPoint.current === 'start') {
            newGrid[r][c].isStart = false;
          } else if (draggingPoint.current === 'end') {
            newGrid[r][c].isEnd = false;
          }
        }
      }
      if (draggingPoint.current === 'start') {
        setStartPoint({ row, col });
      } else if (draggingPoint.current === 'end') {
        setEndPoint({ row, col });
      }
      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: draggingPoint.current === 'start',
        isEnd: draggingPoint.current === 'end',
      };
      setGrid(newGrid);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    draggingPoint.current = null;
  };

  const handleDrop = () => {
    draggingPoint.current = null;
  };

  const handleTouchStart = (e, row, col, isStart, isEnd) => {
    if (isStart) {
      draggingPoint.current = 'start';
    } else if (isEnd) {
      draggingPoint.current = 'end';
    }
  };

  const handleTouchMove = (e, row, col) => {
    if (draggingPoint.current) {
      handleDragEnter(e, row, col);
    }
  };

  const handleTouchEnd = () => {
    draggingPoint.current = null;
  };

  const visualizeAlgorithm = async() => {
    let result;
    switch (algorithm) {
        case 'Dijkstra':
            result = Dijkstra(grid, startPoint, endPoint,speed);
            break;
        case 'BFS':
            result =  BFS(grid, startPoint, endPoint,speed);
            break;
        case 'DFS':
            result =  DFS(grid, startPoint, endPoint,speed);
            break;
        case 'Greedy':
            result =  BestFirstSearch(grid, startPoint, endPoint,speed);
            break;
        case 'A*':
            result = AStar(grid, startPoint, endPoint, speed);
            break;
        default:
            return;
    }
    const { nodesInShortestPathOrder, visitedNodesInOrder } = result;
    console.log(nodesInShortestPathOrder.length,visitedNodesInOrder.length)
    setShortestNodes(nodesInShortestPathOrder.length);
    setNodeVisited(visitedNodesInOrder.length);
    if (nodesInShortestPathOrder.length === 0) {
        window.alert("Path not possible");
    }
    if (!!nodesInShortestPathOrder.length) {
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder,speed);
    }
};

  
  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder,speed) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
       setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder, speed);
        }, 10 * i * speed);
        return;
      }
     
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder,speed) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
     animationTimeouts.current.push(setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const cell = document.getElementById(`cell-${node.row}-${node.col}`);
        if (cell) {
          cell.className = 'w-2 h-2 md:w-4 md:h-4 border border-gray-300 bg-yellow-300 transition duration-500 ease-in-out relative';
        }
      }, 100 * i * speed));
    }
    setVisualizing(false);
  };

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              row={rowIndex}
              col={cellIndex}
              isWall={cell.isWall}
              isStart={cell.isStart}
              isEnd={cell.isEnd}
              onCellClick={handleCellClick}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Grid);

const createInitialGrid = (rows, cols, startPoint, endPoint) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isWall: false,
        isStart: row === startPoint.row && col === startPoint.col,
        isEnd: row === endPoint.row && col === endPoint.col,
        distance: Infinity,
        previousNode: null,
      });
    }
    grid.push(currentRow);
    // console.log(typeof(currentRow)) // object
  }
  // console.log(typeof(grid)); //object
  // console.log(grid[0][2])
  
  return grid;
};
