import {memo} from "react";
import {Handle, Position} from "@xyflow/react";

const SimpleNode = memo(({data, isConnectable}) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id="a"
                style={{top: 0, background: "#555"}}
                isConnectable={isConnectable}
            />
            {(data.label && <div>{data.label}</div>) || <div>Simple</div>}
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={{top: 10, background: "#555"}}
                isConnectable={isConnectable}
            />
        </>
    );
});
export default SimpleNode;
