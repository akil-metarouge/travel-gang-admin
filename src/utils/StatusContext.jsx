import { createContext, useContext, useState } from "react";

const StatusContext = createContext();

export const useStatus = () => useContext(StatusContext);

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  // { type: 'success' | 'error', message: 'text here' }

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};
