// Returns a HTMLElement interface
// which extends Element interface
// which extends Node interface
const app = document.getElementById('app');

const p = document.createElement('p')
p.textContent = "Hello, World!"

app?.appendChild(p)