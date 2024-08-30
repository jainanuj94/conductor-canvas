import {tasks} from "../tasks/tasks.ts";
import {SidebarItem} from "./SidebarItem.tsx";
import {Task} from "../types/Workflow.ts";

const Sidebar = () => {

    return (
        <aside>
            <div className="description">
                You can drag these nodes to the pane on the right.
            </div>
            <SidebarItem className={"output"} type={"startNode"} data={{
                taskReferenceName: "startRef",
                type: "startNode",
                name: "Start"
            }}/>
            {tasks.map((task: Task) => {
                return (
                    <SidebarItem
                        key={task.name}
                        className={"input"}
                        type={task.type}
                        data={task}
                    />
                );
            })}
            <SidebarItem className={"output"} type={"terminateNode"} data={{
                name: "End",
                taskReferenceName: "endRef",
                type: "terminateNode",
                }}/>
        </aside>
    );
};

export default Sidebar;
