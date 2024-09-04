import HumanNode from "./HumanNode.tsx";
import SimpleNode from "./SimpleNode.tsx";
import StartNode from "./StartNode.tsx";
import TerminateNode from "./TerminateNode.tsx";
import HttpNode from "./HTTPNode.tsx";
import SwitchNode from "./SwitchNode.tsx";
import ForkJoinNode from "./ForkJoinNode.tsx";
import JoinNode from "./JoinNode.tsx";

export const nodeTypes = {
  startNode: StartNode,
  terminateNode: TerminateNode,
  HUMAN: HumanNode,
  SIMPLE: SimpleNode,
  HTTP: HttpNode,
  SWITCH: SwitchNode,
  FORK_JOIN: ForkJoinNode,
  JOIN: JoinNode
};
