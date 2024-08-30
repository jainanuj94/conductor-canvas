import {memo} from "react";
import {Handle, Position} from "@xyflow/react";

const SwitchNode = memo(({data, isConnectable}) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id="a"
                style={{top: 0, background: "#555"}}
                isConnectable={isConnectable}
            />
            {(data.name && <div>{data.name}</div>) || <div>Switch</div>}
            {Object.entries(data.decisionCases).map((condition ) => {
                    return (
                        <Handle
                            key={condition[0]}
                            type="source"
                            position={Position.Right}
                            id={condition[0]}
                            style={{top: 15, background: "#555"}}
                            isConnectable={isConnectable}
                        />
                    )
            })}
            <Handle
                type="source"
                position={Position.Left}
                id="default"
                style={{top: 15, background: "#555"}}
                isConnectable={isConnectable}
            />
        </>
    );
});
export default SwitchNode;
