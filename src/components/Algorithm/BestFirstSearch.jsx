const BestFirstSearch = (grid, start, end, speed) => {
    const startNode = grid[start.row][start.col];
    const endNode = grid[end.row][end.col];
    const openSet = [startNode];
    let i = 0;

    while (openSet.length) {
        sortNodesByHeuristic(openSet, endNode);
        const currentNode = openSet.shift();

        if (currentNode === endNode) {
            return {
                nodesInShortestPathOrder: getNodesInShortestPathOrder(endNode),
                visitedNodesInOrder: getAllVisitedNodes(grid),
            };
        }

        setTimeout(() => {
            const cell = document.getElementById(`cell-${currentNode.row}-${currentNode.col}`);
            if (cell) {
                cell.className = 'w-2 h-2 md:w-4 md:h-4 border border-gray-300 bg-blue-300 transition-all duration-1000 ease-in-out';
            }
        }, 10 * i * speed);
        i++;

        currentNode.isVisited = true;
        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.previousNode = currentNode;
            openSet.push(neighbor);
        }
    }

    return { nodesInShortestPathOrder: [], visitedNodesInOrder: [] };
};

const sortNodesByHeuristic = (nodes, endNode) => {
    nodes.sort((nodeA, nodeB) => getHeuristic(nodeA, endNode) - getHeuristic(nodeB, endNode));
};

const getHeuristic = (node, endNode) => {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
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

const getNodesInShortestPathOrder = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
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

export default BestFirstSearch;
