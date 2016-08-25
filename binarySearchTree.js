function BinarySearchTree() {
  let root = null;

  const Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  const insertNode = function(node, newNode) {
    if (node.key > newNode.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode);
      }
    }
  }
  
  this.insert = function(value) {
    const node = new Node(value);

    if (root === null) {
      root = node;
    } else {
      insertNode(root, node);
    }
  }

  const inOrderTraversal = function(node, callback) {
    if (node !== null) {
      inOrderTraversal(node.left, callback);
      callback(node.key);
      inOrderTraversal(node.right, callback);
    }
  }

  const preOrderTraversal = function(node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraversal(node.left, callback);
      preOrderTraversal(node.right, callback);
    }
  }

  const postOrderTraversal = function(node, callback) {
    if (node !== null) {
      postOrderTraversal(node.left, callback);
      postOrderTraversal(node.right, callback);
      callback(node.key);
    }
  }

  const minNumber = function(node) {
    if (node) {
      while(node && node.left !== null) {
        node = node.left
      }

      return node.key;
    }

    return false;
  }

  const findMinNumber = function(node) {
    while (node && node.left !== null) {
      node = node.left;
    }

    return node;
  }

  const maxNumber = function(node) {
    if (node) {
      while(node && node.right !== null) {
        node = node.right;
      }

      return node;
    }

    return false;
  }

  const search = function(node, key) {
    if (node === null) {
      return false;
    }

    if (key < node.key) {
      return search(node.left, key);
    } else if (key > node.key) {
      return search(node.right, key);
    } else {
      return true;
    }
  }

  const removeNode = function(node, key) {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      // case: leaf node
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // case: node with only one child
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // case: removing a node with two children
      var aux = findMinNumber(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }
  }

  const heightNode = function(node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    }
  }

  this.inOrderTraversal = function(callback) {
    inOrderTraversal(root, callback);
  }

  this.preOrderTraversal = function(callback) {
    preOrderTraversal(root, callback);
  }

  this.postOrderTraversal = function(callback) {
    postOrderTraversal(root, callback);
  }

  this.minNumber = function() {
    return minNumber(root)
  }

  this.maxNumber = function() {
    return maxNumber(root);
  }

  this.search = function(key) {
    return search(root, key);
  }

  this.removeNode = function(key) {
    return removeNode(root, key);
  }
}

const bst = new BinarySearchTree();

bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
/*
              11
        07          15
    05      09 13        20
  3  6  8  10  12  14  18  25
*/

const cb = function(key) {
  console.log(key);
}

// bst.inOrderTraversal(cb);
// console.log('---------');
// bst.preOrderTraversal(cb);
// console.log('---------');
// bst.postOrderTraversal(cb);
// console.log('---------');
console.log(bst.minNumber());
console.log(bst.maxNumber());
console.log(bst.search(7));
console.log(bst.search(70));
bst.removeNode(7);
console.log(bst.search(7));
console.log(bst.minNumber(), '<----');
bst.removeNode(3);
console.log(bst.minNumber(), '<----');