import { createContext, useContext, useState } from "react";

export interface DndContextType {
  type: string;
  content: {} | null;
  setType;
  setContent;
}
export const DnDContext = createContext<DndContextType>({} as DndContextType);

export const DnDProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  return (
    <DnDContext.Provider
      value={{
        type,
        content,
        setContent,
        setType,
      }}
    >
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
