/** @jsx h */

function h(type, props, ...children) {
  return { type, props, children };
}

// custom create element, used instead of React.createElement
function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

// get differences between nodes
function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

// update a node, comparing old node and new node
function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    // create new parent
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    // remove the child
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    // compare children
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    // update children
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

// ---------------------------------------------------------------------

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const b = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);

const $root = document.getElementById("root");
const $button = document.querySelector("button");

updateElement($root, a);

$button.addEventListener("click", () => {
  updateElement($root, b, a);
});
