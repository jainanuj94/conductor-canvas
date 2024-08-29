import {ReactFlowProvider,} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {DnDProvider} from "./context/DnDContext.tsx";
import Canvas from "./Canvas.tsx";


const App = () => (
    <ReactFlowProvider>
        <DnDProvider>
            <Canvas/>
        </DnDProvider>
    </ReactFlowProvider>
);

export default App;
