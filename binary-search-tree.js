class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        return undefined; // avoid duplicates
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else if (val > current.val) {
      if (!current.right) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) current = current.left;
      else current = current.right;
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) return this.findRecursively(val, current.left);
    return this.findRecursively(val, current.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    let result = [];
    function traverse(node) {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    let node = this.root;
    let data = [];
    let queue = [node];

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }

  remove(val, current = this.root, parent = null) {
    if (!this.root) return undefined;

    while (current) {
      if (val < current.val) {
        parent = current;
        current = current.left;
      } else if (val > current.val) {
        parent = current;
        current = current.right;
      } else {
        // Node with no children
        if (!current.left && !current.right) {
          if (parent === null) this.root = null;
          else if (parent.left === current) parent.left = null;
          else parent.right = null;
        }
        // Node with one child
        else if (!current.left) {
          if (parent === null) this.root = current.right;
          else if (parent.left === current) parent.left = current.right;
          else parent.right = current.right;
        } else if (!current.right) {
          if (parent === null) this.root = current.left;
          else if (parent.left === current) parent.left = current.left;
          else parent.right = current.left;
        }
        // Node with two children
        else {
          let successor = this.findMin(current.right);
          current.val = successor.val;
          this.remove(successor.val, current.right, current);
        }
        return current;
      }
    }
  }

  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  isBalanced() {
    function height(node) {
      if (!node) return -1;
      return 1 + Math.max(height(node.left), height(node.right));
    }
    if (!this.root) return true;
    return Math.abs(height(this.root.left) - height(this.root.right)) <= 1;
  }

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    if (!current.left) return parent ? parent.val : undefined;

    current = current.left;
    while (current.right) {
      current = current.right;
    }

    return current.val;
  }
}

module.exports = BinarySearchTree;
