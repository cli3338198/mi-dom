# Virtual DOM Mini Project

- Create a Virtual DOM and Emulate React

```js
function h(type, props, ...children) {
  return {
    type,
    props,
    children,
  };
}

const a = (
  <ul class="list">
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);
```

- Use Babel Standalone

```html
<!-- Load Babel -->
<!-- v6 <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script> -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel" src="index.js" />
```

- Use smth
- Insert a comment line at top of source file

```html
/** @jsx h */
```

- Transpiles JSX but instead of React.CreateElement uses 'h'

- Create functions to update DOM and recursively update children
