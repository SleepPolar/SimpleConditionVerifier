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

### 1. Define a Validation Function

You create a function that performs some validation and returns `true` or `false` depending on the result. In this example case, no actual validation is performed; the value of the condition object is simply returned. This can be useful when you want to modify the value of the object elsewhere in the code and return it directly. And the returned value indicates whether the condition is met or not.

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

`verifyConditions` is the main function that evaluates a condition.
- If the condition is of type "OR", it uses some to check if any of the subconditions are true.
- If the condition is of type "AND", it uses every to check if all subconditions are true.
- If it is neither "OR" nor "AND", it simply calls the verification function associated with the condition.

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
            trueCondition
        ]),
        falseCondition
    ])
])
```

This complex condition evaluates to:
**(true && (false || false)) || (true && false && (false || true)) || ((true || true) && false) && false)**

### 6. Evaluate the Complex Condition

Finally, use the `verifyConditions` function to evaluate the complex condition:

```javascript
console.log(verifyConditions(Test)) // Expected result = false
```

## Detailed explanation of the Complex Condition example

In the previous section, we defined a complex condition called Test using a combination of createOrCondition and createAndCondition. Let's analyze how this condition is structured.

First let's see what we want to achieve, in this case we want to achieve this:

**(true && (false || false)) || (true && false && (false || true)) || ((true || true) && true) && false)**

### Start by defining whether the base will be OR or AND
Since the complex condition we want to achieve is divided between "OR" conditions, then we will use the "createOrCondition" as a basis
```javascript
const Test = createOrCondition([ // Explaining this part
])
```

### First Complex Condition:
**(true && (false || false))**
```javascript
const Test = createOrCondition([
    createAndCondition([ // Explaining this part
        trueCondition,
        createOrCondition([falseCondition, falseCondition])
    ]),
])
```
An easy way to understand it is to see `createAndCondition` and `createOrCondition` as a parenthesis, and what is passed as a parameter is what is inside that parenthesis
- If `trueCondition` and `createOrCondition(...)` are `true`, then that parenthesis will return `true`
- If `falseCondition` or `falseCondition` is `true`, then that parenthesis will return to `true`

### Second Complex Condition:
**(true && false && (false || true))**
```javascript
const Test = createOrCondition([
    createAndCondition([
        trueCondition,
        createOrCondition([falseCondition, falseCondition])
    ]),
    createAndCondition([ // Explaining this part
        trueCondition,
        falseCondition,
        createOrCondition([falseCondition, trueCondition])
    ]),
])
```
- If `trueCondition`, `falseCondition`, and `createOrCondition(...)` are `true`, then that parenthesis will return `true`
- If `falseCOndition`, or `trueCondition` is `true`, then that parenthesis will return `true`

### Third Complex Condition:
**((true || true) && true) && false)**
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
    createAndCondition([ // Explaining this part
        createAndCondition([
            createOrCondition([trueCondition, trueCondition]),
            trueCondition
        ]),
        falseCondition
    ])
])
```
- If `createAndCondition(...)` and `trueCondition` are `true`, then that parenthesis will return `true`
- If `trueCondition`, or `trueCondition` is `true`, then that parenthesis will return `true`

**This repository is designed to be an example tool, demonstrating a way to handle checking logical conditions in JavaScript.**
