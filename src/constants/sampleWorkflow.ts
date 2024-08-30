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
