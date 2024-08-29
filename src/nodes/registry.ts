import HumanNode from "./HumanNode.tsx";
import SimpleNode from "./SimpleNode.tsx";
import StartNode from "./StartNode.tsx";
import TerminateNode from "./TerminateNode.tsx";
import HttpNode from "./HTTPNode.tsx";
import SwitchNode from "./SwitchNode.tsx";

export const nodeTypes = {
  startNode: StartNode,
  terminateNode: TerminateNode,
  HUMAN: HumanNode,
  SIMPLE: SimpleNode,
  HTTP: HttpNode,
  SWITCH: SwitchNode,
};
