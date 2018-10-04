export function cmp(str1, str2) {
  return str1 < str2;
}

export class BinaryTree {
  constructor(comparator = cmp, parent = null) {
    this.comparator = comparator;
    this.head = null;
    this.leftBranch = null;
    this.rightBranch = null;
    this.parent = parent;
  }

  chooseBranch(head, str) {
    const isRightBranch = this.comparator(head, str);
    const nextBranch = isRightBranch ? 'rightBranch' : 'leftBranch';
    return nextBranch;
  }

  insert(str) {
    if (this.head === str) {
      throw new Error(`This tree already contains '${str}'`);
    }
    if (!this.head) {
      this.head = str;
      return;
    }
    const nextBranch = this.chooseBranch(this.head, str);
    if (!this[nextBranch]) {
      this[nextBranch] = new BinaryTree(this.comparator, this);
      this[nextBranch].head = str;
    } else {
      this[nextBranch].insert(str);
    }
  }

  replaceNode(child) {
    const { head, leftBranch, rightBranch } = child;
    this.head = head;
    this.rightBranch = rightBranch;
    this.leftBranch = leftBranch;
    return true;
  }

  findMinLeaf() {
    const {
      head, leftBranch, rightBranch, parent,
    } = this;
    if (!leftBranch && !rightBranch) {
      const branchToRemove = this.chooseBranch(parent.head, head);
      parent[branchToRemove] = null;
      return head;
    }
    if (!leftBranch) {
      return rightBranch.findMinLeaf();
    }
    return leftBranch.findMinLeaf();
  }

  removeNode(parent, str) {
    const parentNode = parent;
    if (!parentNode) {
      this.head = null;
    } else {
      const branchToRemove = this.chooseBranch(parentNode.head, str);
      parentNode[branchToRemove] = null;
    }
    return true;
  }

  remove(str) {
    if (!this.exists(str)) {
      throw new Error(`This tree does not contain '${str}'`);
    }

    if (this.head === str) {
      if (!this.rightBranch && !this.leftBranch) {
        return this.removeNode(this.parent, str);
      }
      if (!this.rightBranch) {
        return this.replaceNode(this.leftBranch);
      }
      if (!this.leftBranch) {
        return this.replaceNode(this.rightBranch);
      }
      if (this.rightBranch && this.leftBranch) {
        this.head = this.rightBranch.findMinLeaf();
        return true;
      }
    }
    const nextBranch = this.chooseBranch(this.head, str);
    return this[nextBranch].remove(str);
  }

  height() {
    const countHeight = (tree) => {
      const left = tree.leftBranch ? countHeight(tree.leftBranch) : -1;
      const right = tree.rightBranch ? countHeight(tree.rightBranch) : -1;
      const max = left > right ? left : right;
      return max + 1;
    };
    if (!this.head) {
      return 0;
    }
    return 1 + countHeight(this);
  }

  toArray() {
    const leftBranch = this.leftBranch ? this.leftBranch.toArray() : [];
    const rightBranch = this.rightBranch ? this.rightBranch.toArray() : [];
    const head = this.head ? [this.head] : [];
    return [...leftBranch, ...head, ...rightBranch];
  }

  exists(str) {
    if (this.head === str) {
      return true;
    }
    const nextBranch = this.chooseBranch(this.head, str);
    if (this[nextBranch]) {
      return this[nextBranch].exists(str);
    }
    return false;
  }
}
