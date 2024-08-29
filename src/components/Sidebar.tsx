import {tasks} from "../tasks/tasks.ts";
import {SidebarItem} from "./SidebarItem.tsx";

const Sidebar = () => {

    return (
        <aside>
            <div className="description">
                You can drag these nodes to the pane on the right.
            </div>
            <SidebarItem className={"output"} type={"startNode"} data={{label: "Start"}}/>
            {tasks.map((task: never) => {
                return (
                    <SidebarItem key={task.name} className={"input"} type={task.type} data={{ label: task.name, ... task }}/>
                );
            })}
            <SidebarItem className={"output"} type={"terminateNode"} data={{label: "End"}}/>
        </aside>
    );
};

export default Sidebar;
