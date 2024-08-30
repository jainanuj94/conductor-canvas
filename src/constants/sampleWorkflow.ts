export const sampleWorkflow = {
    name: "WorkflowName",
    description: "Workflow description",
    version: 1,
    inputParameters: ["parameter1", "parameter2", "parameter3"],
    outputParameters: {},
    failureWorkflow: "",
    schemaVersion: 2,
    restartable: true,
    workflowStatusListenerEnabled: false,
    ownerEmail: "admin@mailinator.com",
    timeoutPolicy: "TIME_OUT_WF",
    timeoutSeconds: 60000000,
    variables: {},
    inputTemplate: {},
    onStateChange: {},
    taskToDomain: {
        "*": "DEFAULT",
    },
    tasks: [
        {
            name: "Human",
            taskReferenceName: "humanTaskRef",
            inputParameters: {},
            type: "HUMAN",
            startDelay: 0,
            optional: false,
            asyncComplete: false
        },
        {
            name: "SimpleTask",
            taskReferenceName: "humanTaskRef1",
            inputParameters: {},
            type: "SIMPLE",
            startDelay: 0,
            optional: false,
            asyncComplete: false
        }
    ]
};

export const workflow_with_switch = {
    name: "WorkflowName",
    description: "Workflow description",
    version: 1,
    inputParameters: ["parameter1", "parameter2", "parameter3"],
    outputParameters: {},
    failureWorkflow: "",
    schemaVersion: 2,
    restartable: true,
    workflowStatusListenerEnabled: false,
    ownerEmail: "admin@mailinator.com",
    timeoutPolicy: "TIME_OUT_WF",
    timeoutSeconds: 60000000,
    variables: {},
    inputTemplate: {},
    onStateChange: {},
    taskToDomain: {
        "*": "DEFAULT",
    },
    tasks: [
        {
            name: "Human",
            taskReferenceName: "humanTaskRef",
            inputParameters: {},
            type: "HUMAN",
            startDelay: 0,
            optional: false,
            asyncComplete: false
        },
        {
            name: "SwitchTask",
            taskReferenceName: "switchTaskRef",
            inputParameters: {
                switchCaseValue: "${workflow.input.journeyInputData.value}",
            },
            type: "SWITCH",
            decisionCases: {
                false: [{
                    name: "someTask",
                    taskReferenceName: "someTaskRef",
                    inputParameters: {},
                    type: "HUMAN",
                    startDelay: 0,
                    optional: false,
                    asyncComplete: false
                }],
            },
            defaultCase: [{
                name: "defaultTask",
                taskReferenceName: "defaultTaskRef",
                inputParameters: {},
                type: "HUMAN",
                startDelay: 0,
                optional: false,
                asyncComplete: false
            }],
            startDelay: 0,
            optional: false,
            asyncComplete: false,
            evaluatorType: "value-param",
            expression: "switchCaseValue",
        },
        {
            name: "Human1",
            taskReferenceName: "humanTaskRef1",
            inputParameters: {},
            type: "HUMAN",
            startDelay: 0,
            optional: false,
            asyncComplete: false
        }
    ]
}
