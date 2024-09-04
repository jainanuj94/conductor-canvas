import {Node} from "@xyflow/react";
import {Graph} from "../types/Graph.ts";
import { Task } from "../types/Workflow.ts";

export const processGraph = (graph: Graph, startNodeId: string): Task[] => {
    const { nodes, edges } = graph;
    const nodeMap = new Map<string, Node>();
    const adjacencyList: Map<string, string[]> = new Map();

    // Build a map of node IDs to node objects
    for (const node of nodes) {
        nodeMap.set(node.id, node);
    }

    // Build adjacency list for the graph
    for (const edge of edges) {
        if (!adjacencyList.has(edge.source)) {
            adjacencyList.set(edge.source, []);
        }
        adjacencyList.get(edge.source)?.push(edge.target);
    }

    // Initialize BFS
    const queue: string[] = [startNodeId];
    const visited: Set<string> = new Set();
    const values: Task[] = [];

    while (queue.length > 0) {
        const currentNodeId = queue.shift()!;
        if (visited.has(currentNodeId)) {
            continue;
        }

        visited.add(currentNodeId);
        const node = nodeMap.get(currentNodeId);
        if (node) {
            if (node.type !== "startNode" && node.type !== "terminateNode")
                values.push(node.data);
            const neighbors = adjacencyList.get(currentNodeId) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return values;
};