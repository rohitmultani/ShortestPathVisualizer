
const Dijkstra = (grid, start, end, speed) => {
  
  
    const startNode = grid[start.row][start.col];
    const endNode = grid[end.row][end.col];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);  
let i = 0;
    while (!!unvisitedNodes.length) {
      
      sortNodesByDistance(unvisitedNodes);
      
      const closestNode = unvisitedNodes.shift(); //similar to pq.top();

      if (closestNode.isWall) continue;

      if (closestNode.distance === Infinity) return { nodesInShortestPathOrder: [], visitedNodesInOrder: [] }; //not possible to get shortest path

      closestNode.isVisited = true; // mark curr node as visited
      
      setTimeout(() => {
        const node = closestNode;
        const cell = document.getElementById(`cell-${node.row}-${node.col}`);
        if (cell) {
          cell.className = 'w-2 h-2 md:w-4 md:h-4 border border-gray-300 bg-blue-300 transition-all duration-1000 ease-in-out relative';
        }
      }, 10*i*speed);
        i++;
      

      if (closestNode === endNode) {
        return {
          nodesInShortestPathOrder: getNodesInShortestPathOrder(endNode),
          visitedNodesInOrder: getAllVisitedNodes(grid),
        };
      }

      updateUnvisitedNeighbors(closestNode, grid);
    }

    return { nodesInShortestPathOrder: [], visitedNodesInOrder: [] };
  };

  const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };

  const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };

  const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  };

  const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  const getAllVisitedNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        if (node.isVisited) {
          nodes.push(node);
        }
      }
    }
    return nodes;
  };

  const getNodesInShortestPathOrder = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };

export default Dijkstra;