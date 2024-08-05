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

Here's a simple example of how to use **SimpleConditionVerifier**:

```javascript
const trueCondition = {
    verify: condition => condition.value,
    value: true
};

const falseCondition = {
    verify: condition => condition.value,
    value: false
};

const ageCondition = {
    verify: condition => condition.age >= 18,
    age: 20
};

const compositeCondition = createOrCondition([
    createAndCondition([trueCondition, createOrCondition([falseCondition, falseCondition])]),
    createAndCondition([trueCondition, falseCondition])
]);

console.log(verifyConditions(compositeCondition)); // Evaluates the composite condition
