/** WALKING THE DOM */

// body
const body = document.body
// children
const childrens = body.children;
// child
const firstElementChild = body.firstElementChild
const lastElementChild = childrens?.[1]?.lastElementChild
// siblings
const prevSibling = firstElementChild?.previousElementSibling
const nextSibling = lastElementChild?.nextElementSibling
// parent
const parentEle = prevSibling?.parentElement
console.log(nextSibling, parentEle);
/** SEARCHING */

let element = document.getElementById('elem')
let elements = document.querySelectorAll('ul > li:first-child')
// closest
element = element!.closest('.book')
console.log(element)
 