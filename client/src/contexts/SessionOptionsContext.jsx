import { createContext, useState } from "react";

const SessionOptionsContext = createContext(null);

export const SessionOptionsProvider = ({ children }) => {
  const [selections, setSelections] = useState({
    subject: "Figure",
    gender: "All",
    clothing: "All",
    interval: 5,
    number: 10,
  });

  return (
    <SessionOptionsContext.Provider value={{ selections, setSelections }}>
      {children}
    </SessionOptionsContext.Provider>
  );
};

export default SessionOptionsContext;
