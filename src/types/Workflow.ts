export type Workflow = {
    variables: object;
    schemaVersion: number;
    timeoutPolicy: string;
    restartable: boolean;
    description: string;
    taskToDomain: object;
    version: number;
    inputParameters: string[];
    inputTemplate: object;
    workflowStatusListenerEnabled: boolean;
    ownerEmail: string;
    name: string;
    timeoutSeconds: number;
    onStateChange: object;
    failureWorkflow: string;
    outputParameters: object;
    tasks: object[];
}