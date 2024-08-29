import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const SwitchNode = memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: 0, background: "#555" }}
        isConnectable={isConnectable}
      />
      {(data.label && <div>{data.label}</div>) || <div>Human</div>}
      <Handle
        type="source"
        position={Position.Right}
        id="decisionCase"
        style={{ top: 15, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="default"
        style={{ top: 15, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
export default SwitchNode;
