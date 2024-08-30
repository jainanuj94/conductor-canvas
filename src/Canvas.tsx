import {useCallback, useRef, useState} from "react";
import {Workflow} from "./types/Workflow.ts";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    Edge,
    MiniMap,
    Node,
    Panel,
    ReactFlow,
    ReactFlowJsonObject,
    useReactFlow
} from "@xyflow/react";
import {useDnD} from "./context/DnDContext.tsx";
import {Graph} from "./types/Graph.ts";
import {processGraph} from "./graphs/processGraph.ts";
import {nodeTypes} from "./nodes/registry.ts";
import {Button} from "@mui/material";
import ModalComponent from "./components/ModelComponent.tsx";
import Sidebar from "./components/Sidebar.tsx";
import {sampleWorkflow, workflow_with_switch} from "./constants/sampleWorkflow.ts";
import {createGraph} from "./graphs/createGraph.ts";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];
let id = 0;
const getId = (type: string) => `${type}_${id++}`;
const flowKey = "sample-flow";

const Canvas = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [workflow, setWorkflow] = useState<Workflow>(null);
    const [modelOpen, setModalOpen] = useState(false);
    const [rfInstance, setRfInstance] = useState<ReactFlowJsonObject>(null);
    const { setViewport } = useReactFlow();

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();
    const { type, content } = useDnD();

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            if (
                type === "startNode" &&
                nodes.filter((n) => n.type.startsWith("startNode")).length > 0
            ) {
                console.warn("Only one start node is expected");
                return;
            }
            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(type),
                type: type,
                position,
                data: {
                    label: content.label,
                    value: content,
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type, content],
    );

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow: ReactFlowJsonObject = rfInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow: ReactFlowJsonObject = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport]);

    const showAlert = () => {
        const workflow: Workflow = {
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
            tasks: []
        };

        const graph: Graph = { nodes, edges };
        workflow.tasks = processGraph(graph,
            nodes.find((n) => n.type.startsWith("startNode")).id);
        setWorkflow(workflow);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const generateGraph = () => {
        // const { nodes, edges } = createGraph(sampleWorkflow);
        const { nodes, edges } = createGraph(workflow_with_switch);
        setNodes(nodes);
        setEdges(edges);
    }

    return (
        <main style={{ height: "100%" }}>
            <div style={{ height: "100%" }} className={"dndflow"}>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        onNodesChange={onNodesChange}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onInit={setRfInstance}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Panel position="top-left">
                            <Button type={"button"} variant="contained" onClick={showAlert}>
                                Console Workflow
                            </Button>
                            <ModalComponent open={modelOpen} handleClose={closeModal}  jsonContent={workflow}/>
                            <Button type={"button"} variant="contained" className={"m-4 p-4"} onClick={generateGraph}> Import </Button>
                        </Panel>
                        <Panel position={"top-right"}>
                            <Button type={"button"} variant="contained" className={"m-4 p-4"} onClick={onSave}> Save </Button>
                            <Button type={"button"} variant="contained" className={"m-4 p-4"} onClick={onRestore}> Restore </Button>
                        </Panel>
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>
                <Sidebar />
            </div>
        </main>
    );
};

export default Canvas;