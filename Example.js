function valueFunct(condition) {
    return condition.value;
}

const trueCondition = {
    verify: valueFunct,
    value: true,
}

const falseCondition = {
    verify: valueFunct,
    value: false,
}

function createOrCondition(conditions) {
    return {
        type: "OR",
        conditions: conditions
    }
}

function createAndCondition(conditions) {
    return {
        type: "AND",
        conditions: conditions
    }
}

function verifyConditions(condition) {
    return condition.type === 'OR' 
    ? condition.conditions.some(verifyConditions) 
    : condition.type === 'AND' 
        ? condition.conditions.every(verifyConditions) 
        : condition.verify(condition)
}

// (true && (false || false)) || (true && false && (false || true)) || (((true || true) && false) && false)
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

console.log(verifyConditions(Test)) // Expected result = false