function Graph() {
  const vertices = [];
  const adjacentList = new Map();

  function initializeColor() {
    const colors = [];

    for(let i = 0; i < vertices.length; i++) {
      colors[vertices[i]] = 'white';
    }
    
    return colors;
  }

  this.addVertex = function(v) {
    vertices.push(v);
    adjacentList.set(v, []);
  }

  this.addEdge = function(v, w) {
    adjacentList.get(v).push(w);
    adjacentList.get(w).push(v);
  }

  this.toString = function() {
    let str = '';

    for (let i = 0; i < vertices.length; i++) {
      const neighbors = adjacentList.get(vertices[i]);

      str += `${vertices[i]} -> `;
      for (let h = 0; h < neighbors.length; h++) {
        str += `${neighbors[h]} `;
      }

      str += '\n';
    }

    return str;
  }

  this.bfs = function(v, callback) {
    const color = initializeColor();
    const queue = new Map();
    queue.enqueue(color[v]);

    while(!queue.isEmpty()) {
      let u = queue.dequeue();
      let neighbors = adjacentList.get(u);
      color[u] = 'grey';

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (color[neighbor] === 'white') {
          color[neighbor] = 'grey';
          queue.enqueue(neighbor);
        }
      }

      color[u] = 'black';

      if (callback) {
        callback(u);
      }

    }

  }

}

const graph = new Graph();
const myVerts = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (let i = 0; i < myVerts.length; i++) {
  graph.addVertex(myVerts[i]);
}

  function printNode(value) {
    console.log('visited vertex', value);
  }


graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

graph.bfs(myVerts[0], printNode);