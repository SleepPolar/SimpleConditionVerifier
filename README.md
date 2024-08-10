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

You can create simple conditions or combine them into more compound conditions using logical operators:

- **`createOrCondition(conditions)`**: Creates an OR condition. The result is true if at least one of the nested conditions is true.
- **`createAndCondition(conditions)`**: Creates an AND condition. The result is true only if all of the nested conditions are true.
- In both cases, the function receives an array of conditions as a parameter
- An easy way to understand it is to see createAndCondition and createOrCondition as a parenthesis, and what is passed as a parameter is what is inside that parenthesis

### Verifying Conditions

The `verifyConditions(condition)` function evaluates the condition:
- If the condition type is "OR", it uses `some` to check if at least one nested condition is true.
- If the condition type is "AND", it uses `every` to ensure all nested conditions are true.
- For non-compound conditions, it calls the `verify` function directly.

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

### 5. Example of a Compound Condition

Here is an example of a compound condition that combines multiple conditions using `createOrCondition` and `createAndCondition`:

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

This compound condition evaluates to:

**(true && (false || false)) || (true && false && (false || true)) || (((true || true) && false) && false)**

### 6. Evaluate the Compound Condition

Finally, use the `verifyConditions` function to evaluate the compound condition:

```javascript
console.log(verifyConditions(Test)) // Expected result = false
```

## Explanation of the Compound Condition example

In the previous section, we defined a compound condition called Test using a combination of createOrCondition and createAndCondition. Let's analyze how this condition is structured.

First let's see what we want to achieve, in this case we want to achieve this:

**(true && (false || false)) || (true && false && (false || true)) || (((true || true) && false) && false)**

### Start by defining whether the base will be OR or AND
Since the compound condition we want to achieve is divided between "OR" conditions, then we will use the "createOrCondition" as a basis
```javascript
const Test = createOrCondition([ // Explaining this part
])
```

### First Compound Condition
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

### Second Compound Condition
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

### Third Compound Condition
**((true || true) && false) && false)**
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
            falseCondition
        ]),
        falseCondition
    ])
])
```
- If `createAndCondition(...)` and `trueCondition` are `true`, then that parenthesis will return `true`
- If `trueCondition`, or `trueCondition` is `true`, then that parenthesis will return `true`

### Defining the base as AND
You could also achieve the same end result by evaluating the conditions but defining the base as **`"AND"`"** instead of **`"OR"`**. You are free to choose the one you want, but it would be better to use the one that is easiest to understand in your case
That could be something like this:

**((true && (false || false)) || (true && false && (false || true)) || ((true || true) && false)) && false**
```javascript
const Test = createAndCondition([
    createOrCondition([
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
            createOrCondition([trueCondition, trueCondition]),
            falseCondition
        ])
    ]),
    falseCondition
]);
```

## Showing the path that the verifyConditions takes in the Test
Let's remember the rules:
- If it is of type **`"OR"`** or **`"AND"`** it means that it is a compound condition, that is, a parenthesis with conditions.
- If **`"OR"`** at least one of the conditions must be true.
- If **`"AND"`** all conditions must be true
- Analyzed from left to right

*To simplify it, we will put what the compound condition would look like instead of showing the Test object, to make it easier to understand. If you want, after reading this you can analyze the Test object.*

**(true && (false || false)) || (true && false && (false || true)) || (((true || true) && false) && false)**

### First Compound Condition
**analyzes = (true && (false || false))**
- Conditions that exist: 3
- verified conditions: 3
- The result is: false

**Little explanation:**
The parenthesis is of type **`"AND"`** and the first condition gives `"true"`, then it continues with the next, the next condition is an **`"OR"`** parenthesis, since all the conditions of the parenthesis of type **`"OR"`** are `false`. The result will be `false`

### Second Compound Condition
**analyzes = (true && false && (false || true))**
- Conditions that exist: 4
- verified conditions: 2
- The result is: false

**Little explanation:**
The parenthesis is of type **`"AND"`** and the first condition gives `"true"`, then it continues with the next, the next condition is `false`, since there is a `false` condition, there is no need to check the following conditions, since in the parentheses of type **`"AND"`** all conditions must be `true`. The result will be `false`

### Third Compound Condition
**analyzes = ((true || true) && false) && false)**
- Conditions that exist: 4
- verified conditions: 2
- The result is: false

**Little explanation:**
The parenthesis is of type **`"AND"`** and the first condition is a parenthesis of type **`"AND"`**, whose first condition is a parenthesis of type **`"OR"`**, the first condition of that parenthesis is `true`, since it is `true` it is not necessary to verify the next condition of that parenthesis since it is of type **`"OR"`**, thus we end up with that parenthesis, the next condition is `false`, since it is `false` and it is a parenthesis of **`"AND"`**, we no longer have to validate the last condition. The result will be `false`

### Result
- Conditions that exist: 11
- verified conditions: 7
- The result is: false

## Contributions
If you would like to contribute to the project, please submit a pull request with your changes. Make sure your code is well documented and tested.

***This repository is designed to be an example tool, demonstrating a way to handle checking logical conditions in JavaScript. You can adapt it to your needs or use it as a reference for how to manage logical conditions in your own projects.*** 👍
