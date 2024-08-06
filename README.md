# SimpleConditionVerifier
**SimpleConditionVerifier** is a demonstration of how to structure and evaluate conditions using customizable objects and functions. This simple example can help users understand or implement flexible conditional logic and serve as a starting point. It's a simple base that you can modify and improve to suit your specific needs.

## Overview

**SimpleConditionVerifier** allows you to create and evaluate conditions by defining objects with a `verify` function. The `verify` function takes the object as a parameter and returns a boolean indicating whether the condition is met.

## How It Works

### Condition Objects

Each condition object must have the following property:
- **`verify`**: A function that takes the condition object as a parameter and returns a boolean.

Condition objects can include any number of additional properties. The `verify` function can use any of these properties, or none at all, depending on the logic you want to implement.

### Condition Functions

You define functions to verify conditions. These functions should:
- Take a condition object as a parameter.
- Return a boolean value based on the condition's logic.

### Creating Conditions

You can create simple conditions or combine them into more complex conditions using logical operators:

- **`createOrCondition(conditions)`**: Creates an OR condition. The result is true if at least one of the nested conditions is true.
- **`createAndCondition(conditions)`**: Creates an AND condition. The result is true only if all of the nested conditions are true.
- In both cases, the function receives an array of conditions as a parameter

### Verifying Conditions

The `verifyConditions(condition)` function evaluates the condition:
- If the condition type is "OR", it uses `some` to check if at least one nested condition is true.
- If the condition type is "AND", it uses `every` to ensure all nested conditions are true.
- For non-composite conditions, it calls the `verify` function directly.

## Example

In case it is not very clear, here is a small example of how to use **SimpleConditionVerifier**:

You create a function that performs some validation and returns true or false depending on the result.
In this scenario no validation is performed, the value of the condition object is simply returned, sometimes it might be useful not to perform validation and simply modify the value of the object elsewhere in the code and return it.
```javascript
function valueFunct(condition) {
    return condition.value;
}
```

## Example

In case it is not very clear, here is a small example of how to use **SimpleConditionVerifier**:

### 1. Define a Validation Function

You create a function that performs some validation and returns `true` or `false` depending on the result. In this example case, no actual validation is performed; the value of the condition object is simply returned. This can be useful when you want to modify the value of the object elsewhere in the code and return it directly.

```javascript
function valueFunct(condition) {
    return condition.value;
}
```

### 2. Define Simple Conditions

Here, two simple conditions are defined using the `valueFunct` function. `trueCondition` always returns `true`, and `falseCondition` always returns `false`.

```javascript
const trueCondition = {
    verify: valueFunct,
    value: true,
}

const falseCondition = {
    verify: valueFunct,
    value: false,
}
```

### 3. Create Functions for Composing Conditions

The following functions help create compound conditions using logical operators:

- `createOrCondition` creates a condition that is true if at least one of its sub-conditions is true.

```javascript
function createOrCondition(conditions) {
    return {
        type: "OR",
        conditions: conditions
    }
}
```

- `createAndCondition` creates a condition that is true only if all of its sub-conditions are true.

```javascript
function createAndCondition(conditions) {
    return {
        type: "AND",
        conditions: conditions
    }
}
```

### 4. Verify Conditions

The `verifyConditions` function evaluates a condition. It recursively evaluates conditions based on their type:

```javascript
function verifyConditions(condition) {
    return condition.type === 'OR' 
    ? condition.conditions.some(verifyConditions) 
    : condition.type === 'AND' 
        ? condition.conditions.every(verifyConditions) 
        : condition.verify(condition)
}
```

### 5. Example of a Complex Condition

Here is an example of a complex condition that combines multiple conditions using `createOrCondition` and `createAndCondition`:

```javascript
const Test = createOrCondition([
    createAndCondition([
        trueCondition,
        createOrCondition([falseCondition, falseCondition])
    ]),
    createAndCondition([
        trueCondition,
        falseCondition,
        createOrCondition([falseCondition, trueCondition])
    ]),
    createAndCondition([
        createAndCondition([
            createOrCondition([trueCondition, trueCondition]),
            falseCondition
        ]),
        falseCondition
    ])
])
```

This complex condition evaluates to:
**(true && (false || false)) || (true && false && (false || true)) || (false || true) && false) && false**

### 6. Evaluate the Complex Condition

Finally, use the `verifyConditions` function to evaluate the complex condition:

```javascript
console.log(verifyConditions(Test)) // Expected result = false
```

// Este repositorio está diseñado para ser una herramienta de ejemplo, demostrando cómo manejar la verificación de condiciones lógicas en JavaScript.
