import { memo } from "react";
import {Handle, Position, useHandleConnections} from "@xyflow/react";

const HttpNode = memo(({ data, isConnectable }) => {
    const connections = useHandleConnections({type: "source", id:"source_0"});

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id="target_0"
                style={{ top: 0, background: "#555" }}
                isConnectable={isConnectable}
            />
            {(data.label && <div>{data.label}</div>) || <div>Human</div>}
            <Handle
                type="source"
                position={Position.Bottom}
                id="source_0"
                style={{ top: 15, background: "#555" }}
                isConnectable={connections.length < 1}

            />
        </>
    );
});
export default HttpNode;
