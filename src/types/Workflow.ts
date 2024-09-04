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

export type Task = {
    name: string;
    taskReferenceName: string;
    inputParameters?: Record<string, any>;
    type: string;
    startDelay?: number;
    optional?: boolean;
    asyncComplete?: boolean;
    decisionCases?: Record<string, Task[]>;
    loopOver: Task[];
    defaultCase?: Task[];
    evaluatorType?: string;
    expression?: string;
}