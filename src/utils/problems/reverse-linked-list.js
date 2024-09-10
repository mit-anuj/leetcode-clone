import assert from "assert";
import example from './images/reverseLL.jpg'
// JavaScript doesn't have a built-in LinkedList class, so we'll create one manually.
class LinkedList {
    constructor(value){
        this.value = value;
        this.next = null;
    }
    reverse(){
        let curr = this;
        let prev = null;
        while(curr!==null){
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

}
// adding values in the linkedlist
const createLinkedList = (values)=>{
    const head = new LinkedList(values[0]);
    let curr = head;
    for(let i=1; i<values.length; i++){
        const node = new LinkedList(values[i]);
        curr.next = node;
        curr = node;
    }
}
// getting the values of list and storing it in an array for further processing.
function getListValues(head){
    const values = []
    let curr = head;
    while(curr!=null){
        values.push(curr.value);
        curr = curr.next;
    }
    return values;
}

export const reverseLinkedListHandler = (fn) => {
  try {
    const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
    const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
    for (let i = 0; i < tests.length; i) {
      const list = createLinkedList(tests[i]);
      const result = fn(list);
      assert.deepEqual(getListValues(result), answers[i]);
    }
    return true;
  } catch (e) {
    console.log("error form reverseLinkedListHandler: ",e);
    throw new Error(e)
  }
};

const starterCodeReverseLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  // Write your code here
};`;

export const reverseLinkedList = {
  id: "reverse-linked-list",
  title: "2. Reverse Linked List",
  problemStatement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>
	`,
  examples: [
    {
      id: 0,
      inputText: "head = [1,2,3,4,5]",
      outputText: "[5,4,3,2,1]",
      img: example.src,
    },
    {
      id: 1,
      inputText: "head = [1,2,3]",
      outputText: "[3,2,1]",
    },
    {
      id: 2,
      inputText: "head = [1]",
      outputText: "[1]",
    },
  ],
  constraints: `<li class='mt-2'>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,
  starterCode: starterCodeReverseLinkedListJS,
  handlerFunction: reverseLinkedListHandler,
  starterFunctionName: "function reverseLinkedList(",
  order: 2,
};
