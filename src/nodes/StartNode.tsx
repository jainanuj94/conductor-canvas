import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const StartNode = memo(({ data, isConnectable }) => {
  return (
    <>
      {(data.label && <div>{data.label}</div>) || <div>Start</div>}
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ top: 15, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
export default StartNode;
