"use client";

import { createContext, useContext, useState } from "react";

const Admin_context = createContext({});

export const Admin_context_Info = (props: any) => {
  const { children } = props;
  const [show, setshow] = useState(false);

  // this is for the settings context
  const [show_setting_modal, setshow_setting_modal] = useState(false);
  return (
    <Admin_context.Provider
      value={{
        show,
      }}
    >
      {children}
    </Admin_context.Provider>
  );
};

export const useAdmin_context = () => useContext(Admin_context);
