// @flow
import * as React from 'react';
import {useDnD} from "../context/DnDContext.tsx";
import {Task} from "../types/Workflow.ts";

type Props = {
    className: string | null,
    type: string,
    data: Task
};
export const SidebarItem = (props: Props) => {
    const {setType, setContent} = useDnD();

    const onDragStart = (event, nodeType: string, values: Task) => {
        if (setType) {
            setType(nodeType);
        }
        setContent(values);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div
            className={`dndnode ${props.className}`}
            onDragStart={(event) =>
                onDragStart(event, props.type, props.data)
            }
            draggable
        >
            {props.data.name}
        </div>
    );
};