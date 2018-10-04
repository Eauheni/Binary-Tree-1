import _ from 'lodash';
import { BinaryTree, cmp } from '../BinaryTree';


describe('my tests', () => {
  test('check head and two branches', () => {
    const tree = new BinaryTree(cmp);
    expect(tree.head).toBe(null);
    expect(tree.leftBranch).toBe(null);
    expect(tree.rightBranch).toBe(null);
  });

  test('insert', () => {
    const tree = new BinaryTree(cmp);
    tree.insert('b');
    expect(tree.head).toBe('b');

    tree.insert('a');
    tree.insert('c');
    expect(tree.leftBranch.head).toBe('a');
    expect(tree.rightBranch.head).toBe('c');
  });

  test('exists', () => {
    const tree = new BinaryTree(cmp);
    tree.insert('b');
    tree.insert('a');
    tree.insert('c');
    tree.insert('f');

    expect(tree.exists('d')).toBe(tree.rightBranch.rightBranch.head === 'd');
    expect(tree.exists('a')).toBe(tree.leftBranch.head === 'a');
  });

  test('height', () => {
    const tree = new BinaryTree(cmp);
    tree.insert('b');
    tree.insert('a');
    tree.insert('c');

    expect(tree.height()).toBe(2);

    tree.insert('d');
    tree.insert('e');

    expect(tree.height()).toBe(4);
  });

  test('toArray', () => {
    const tree = new BinaryTree(cmp);
    tree.insert('b');
    tree.insert('a');
    tree.insert('c');
    const expectedArray = ['a', 'b', 'c'];

    expect(_.difference(tree.toArray(), expectedArray)).toHaveLength(0);
  });

  test('remove', () => {
    const tree = new BinaryTree(cmp);
    tree.insert('b');
    tree.insert('a');
    tree.insert('c');
    tree.insert('d');

    tree.remove('c');
    expect(tree.rightBranch.head).toBe('d');
  });
});

describe('your tests', () => {
  test('methods', () => {
    const tree = new BinaryTree(cmp);
    tree.insert('b');
    tree.insert('a');
    tree.insert('c');
    expect(tree.height()).toBe(2);

    const expectedArray = ['a', 'b', 'c'];
    expect(_.difference(tree.toArray(), expectedArray)).toHaveLength(0);

    tree.remove('b');
    tree.insert('b');

    expect(tree.height()).toBe(3);
    expect(_.difference(tree.toArray(), expectedArray)).toHaveLength(0);

    tree.insert('z');

    expect(tree.height()).toBe(3);
    expect(_.difference(tree.toArray(), expectedArray.concat('z'))).toHaveLength(0);

    tree.insert('y');
    tree.insert('x');

    expect(tree.height()).toBe(4);
    expect(_.difference(tree.toArray(), expectedArray.concat(['x', 'y', 'z']))).toHaveLength(0);

    try {
      tree.insert('x');
      expect(true).toBe(false);
    } catch ({ message }) {
      expect(message).toEqual("This tree already contains 'x'");
    }

    try {
      tree.remove('x');
      tree.remove('x');
      expect(true).toBe(false);
    } catch ({ message }) {
      expect(message).toEqual("This tree does not contain 'x'");
    }
  });

  test('remove all', () => {
    const tree = new BinaryTree(cmp);

    tree.insert('a');
    tree.insert('b');
    tree.insert('c');
    tree.insert('d');
    tree.insert('e');

    expect(tree.height()).toBe(5);
    const expectedArray = ['a', 'b', 'c', 'd', 'e'];
    expect(_.difference(tree.toArray(), expectedArray)).toHaveLength(0);

    tree.remove('b');
    tree.remove('a');
    tree.remove('c');
    tree.remove('d');
    tree.remove('e');

    expect(tree.height()).toBe(0);
    expect(tree.toArray()).toHaveLength(0);
  });
});
