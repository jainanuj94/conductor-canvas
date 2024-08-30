import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const TerminateNode = memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="target_0"
        style={{ top: 0, background: "#555" }}
        isConnectable={isConnectable}
      />
      {(data.name && <div>{data.name}</div>) || <div>End</div>}
    </>
  );
});
export default TerminateNode;
