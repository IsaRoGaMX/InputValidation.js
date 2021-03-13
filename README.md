# InputValidation.js

### Examples

- How to init inputs to validate
Init inputs on #formId
```javascript
$('#formId').initInputs();
```

- Skip input

```html
<input id="input1" type="text" skip-validation />
```

- Numeric input
```html
<input id="numberInput" type="number" />
```

### Validate Form
```javascript
$('#formId').validateInputs();
```