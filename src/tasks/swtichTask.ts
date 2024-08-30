export const switchTask = {
    name: "SwitchTask",
    taskReferenceName: "switchTaskRef",
    inputParameters: {
        switchCaseValue: "${workflow.input.journeyInputData.value}",
    },
    type: "SWITCH",
    decisionCases: {
        false: [],
    },
    defaultCase: [],
    startDelay: 0,
    optional: false,
    asyncComplete: false,
    evaluatorType: "value-param",
    expression: "switchCaseValue",
};
