function LinkedList() {
  let Node = function(element) {
    this.element = element;
    this.next = null;
  }

  let length = 0;
  let head = null;

  this.append = function(element) {
    let node = new Node(element);
    let current;

    if (head === null) {
      head = node;
    } else {
      current = head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    length++;
  };

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        head = current.next;
      } else {
        while(index++ < position) {
          previous = current;
          current = current.next;
        }

        previous.next = current.next;
      }

      length--;

      return current.element;
    } else {
      return null;
    }

  }

  this.insert = function(position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element);
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        node.next = current;
        head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        node.next = current;
        previous.next = node;
      }

      length++;
      return true;
    } else {
      return false;
    }
  }

  this.toString = function() {
    let current = head,
      string = '';
    
    while (current) {
      string += current.element + (current.next ? '||' : '');
      current = current.next;
    }

    return string;
  }

  this.indexOf = function(element) {
    let current = head;
    let index = -1;

    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }

    return -1;
  }
  
  this.isEmpty = function() {
    return length === 0;
  }

  this.size = function() {
    return length;
  }

  this.getHead = function() {
    return head;
  }

  let prev;
  let uniques = [];

  const removeDups = function(node) {
    if (uniques.indexOf(node.element) === -1) {
      uniques.push(node.element);
      prev = node;
    } else {
      if (prev) {
        prev.next = node.next;
      }
    }

    if (node.next !== null) {
      removeDups(node.next);
    }
  }

  this.removeDups = function() {
    prev = null;
    removeDups(head);
  }

// 4 6 7 7 5 2
  const removeDupsNB = function(node) {
    if (node.next) {
      console.log(node.element);
      if (node.element === node.next.element) {
        node.next = node.next.next;
      }

        removeDupsNB(node.next);
    }
  }

  this.removeDupsNB = function() {
    prev = null;
    removeDupsNB(head);
  } 
}

const list = new LinkedList();
list.append(7);
list.append(0);
list.append(1);
list.append(7);
list.append(3);
list.append(4);
list.append(4);
list.append(8);
console.log(list.toString());
list.removeDupsNB()
console.log(list.toString());

// function HashTable() {
//   const table = [];

//   const loseloseHashCode = function(key) {
//     let hash = 0;
//     for (let i = 0; i < key.length; i++) {
//       hash += key.charCodeAt(i);
//     }

//     return hash % 37;
//   }

//   const ValuePair = function(key, value) {
//     this.key = key;
//     this.value = value;

//     this.toString = function() {
//       return `[${this.key} - ${this.value}]`;
//     }
//   }

//   this.put = function(key, value) {
//     // return table[loseloseHashCode(key)] = value;
//     const position = loseloseHashCode(key);

//     if (typeof table[position] === 'undefined') {
//       table[position] = new LinkedList()
//     }

//     table[position].append(new ValuePair(key, value));
//   }

//   this.remove = function(key) {
//     // table[loseloseHashCode(key)] = undefined;
//     const position = loseloseHashCode(key);

//     if (table[position] !== undefined) {
//       var current = table[position].getHead();

//       while(current.next) {
//         if (current.element.key === key) {
//           table[position].remove(current.element);
//           if (table[position].isEmpty()) {
//             table[position] = undefined;
//           }

//           return true;
//         }

//         current = current.next;
//       }

//       // check in case first or last element
//       if (current.element.key === key) {
//         table[position].remove(current.element);
//         if (table[position].isEmpty()) {
//           table[position] = undefined;
//         }

//         return true;
//       }
      
//     }

//     return false;
    
//   }

//   this.get = function(key) {
//     // return table[loseloseHashCode(key)];
//     const position = loseloseHashCode(key);
//     if (table[position] !== undefined) {
//       // iterate linked list to to find key/value
//       const current = table[position].getHead();

//       while (current.next) {
//         if (current.element.key === key) {
//           return current.element.value;
//         }

//         current = current.next;
//       }

//       // check in case first or last element
//       if (current.element.key === key) {
//         return current.element.value;
//       }
//     }

//     return undefined;


//   }

//   this.getTable = function() {
//     return table;
//   }
// }

// const table = new HashTable();

// table.put('alex', 26);
// table.put('davinci', 4);
// table.put('jorge', 20);
// console.log(table.get('jorge'));
// table.put('jorge', 2);
// console.log(table.get('jorge'));