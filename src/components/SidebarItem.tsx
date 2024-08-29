// @flow
import * as React from 'react';
import {useDnD} from "../context/DnDContext.tsx";

type Props = {
    className: string | null,
    type: string,
    data: {
        label: string,
        value?: never
    }
};
export const SidebarItem = (props: Props) => {
    const {setType, setContent} = useDnD();

    const onDragStart = (event, nodeType, values) => {
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
            {props.data.label}
        </div>
    );
};