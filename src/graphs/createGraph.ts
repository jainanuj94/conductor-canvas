import {Workflow} from "../types/Workflow.ts";
import {Edge, Node} from "@xyflow/react";
import {Graph} from "../types/Graph.ts";

const preprocessTasks = (workflow: Workflow) : Workflow => {
    workflow.tasks.unshift({
        "name": "startNode",
        "taskReferenceName": "startNodeRef",
        "type": "startNode"
    });
    workflow.tasks.push({
        "name": "terminateNode",
        "taskReferenceName": "terminateNodeRef",
        "type": "terminateNode"
    })
    return workflow;
}

export const createGraph = (workflow: Workflow) : Graph => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const fetchId = (type: string, index: number) => `${type}-${index}`;

    const processedWorkflow = preprocessTasks(workflow);
    processedWorkflow.tasks.forEach((task, index) => {
        // Create a node
        const nodeId = fetchId(task.type, index);
        const position = { x: 250, y: index * 100 }; // Adjust x and y positions as needed

        const node: Node = {
            id: nodeId,
            type: task.type,
            position,
            data: {
                label: task.name,
                value: task,
            },
        };

        nodes.push(node);

        // Create an edge from the previous node to the current node, if applicable
        if (index > 0) {
            const previousNodeId = fetchId(workflow.tasks[index - 1].type, index - 1);
            const edge: Edge = {
                id: `edge-${previousNodeId}-${nodeId}`,
                source: previousNodeId,
                target: nodeId,
            };
            edges.push(edge);
        }
    });

    return { nodes, edges };
}