import {memo} from "react";
import {Handle, Position, useHandleConnections} from "@xyflow/react";

const StartNode = memo(({data}) => {
    const connections = useHandleConnections({type: "source", id: "source_0"});
    return (
        <>
            {(data.name && <div>{data.name}</div>) || <div>Start</div>}
            <Handle
                type="source"
                position={Position.Bottom}
                id="source_0"
                style={{top: 15, background: "#555"}}
                isConnectable={connections.length < 1}
            />
        </>
    );
});
export default StartNode;
