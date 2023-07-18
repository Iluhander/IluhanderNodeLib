/**
 * A wrapper over an array that adds memory redundancy functionality.
 * Essentially an analogue of std::vector from C++.
 */
export default class FastArray<T> {
  array: Array<T> = [];

  private _it = 0;

  getLast() {
    return this._it;
  }

  /**
   * Constructor.
   * @param length - if passed, it reserves the length of cells in the array.
   */
  constructor(length = 0) {
    this.reserve(length);
  }

  reserve(length: number) {
    this.array = new Array(length);
  }

  push(elem: T): T {
    if (this._it < this.array.length) {
      return (this.array[this._it++] = elem);
    }

    // If we go beyond the array boundary, we double the size of the array.
    this.array = this.array.concat(new Array(this.array.length || 1));
    return this.push(elem);
  }

  concat(elems: T[]) {
    for (let i = 0; i < elems.length; ++i) {
      this.push(elems[i]);
    }
  }
}
