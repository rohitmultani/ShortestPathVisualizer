import React, { createContext, useContext, useReducer } from 'react';

const VisualizerContext = createContext();

const initialState = {
  algorithm: 'Dijkstra',
  speed: 1,
  startPoint: { row: 7, col: 7 },
  endPoint: { row: 21, col: 21 },
  visualizing: false,
  clearBoard: false,
  nodeVisited: 0,
  shortestNodes: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALGORITHM':
      return { ...state, algorithm: action.payload };
    case 'SET_SPEED':
      return { ...state, speed: action.payload };
    case 'SET_START_POINT':
      return { ...state, startPoint: action.payload };
    case 'SET_END_POINT':
      return { ...state, endPoint: action.payload };
    case 'SET_VISUALIZING':
      return { ...state, visualizing: action.payload };
    case 'SET_CLEAR_BOARD':
      return { ...state, clearBoard: action.payload };
    case 'SET_NODE_VISITED':
      return { ...state, nodeVisited: action.payload };
    case 'SET_SHORTEST_NODES':
      return { ...state, shortestNodes: action.payload };
    default:
      return state;
  }
};

export const useVisualizerContext = () => useContext(VisualizerContext);

export const VisualizerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setAlgorithm: (payload) => dispatch({ type: 'SET_ALGORITHM', payload }),
    setSpeed: (payload) => dispatch({ type: 'SET_SPEED', payload }),
    setStartPoint: (payload) => dispatch({ type: 'SET_START_POINT', payload }),
    setEndPoint: (payload) => dispatch({ type: 'SET_END_POINT', payload }),
    setVisualizing: (payload) => dispatch({ type: 'SET_VISUALIZING', payload }),
    setClearBoard: (payload) => dispatch({ type: 'SET_CLEAR_BOARD', payload }),
    setNodeVisited: (payload) => dispatch({ type: 'SET_NODE_VISITED', payload }),
    setShortestNodes: (payload) => dispatch({ type: 'SET_SHORTEST_NODES', payload }),
  };

  return <VisualizerContext.Provider value={value}>{children}</VisualizerContext.Provider>;
};
