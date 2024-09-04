import {sampleDefinition} from "./mocks/workflowDefinitions";
import WorkflowDAG from "../src/graphs/WorkflowDAG";
import {getReactFlowElementsFromGraph} from "../src/graphs/createGraph";

describe('Test create graph with d3', () => {

    it('should create graph', () => {
        const workflowDAG = new WorkflowDAG(sampleDefinition);
        workflowDAG.defToGraph(sampleDefinition)
        const graph = workflowDAG.fetchGraph();

        console.log(graph.nodes())
        console.log(graph.edges())

        const layoutedElements = getReactFlowElementsFromGraph(graph);
        console.log(layoutedElements);
    });
});