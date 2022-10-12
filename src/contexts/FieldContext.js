import { createContext, useReducer } from "react";
import fieldsReducer from "./fieldsReducer";

const initialState = {
  currentId: 1,
  fields: [
    {
      id: 0,
      ques: "",
      ans: "",
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(fieldsReducer, initialState);

  //Actions.
  const addField = () => {
    dispatch({
      type: "ADD_Field",
    });
  };

  const updateField = (field) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: field,
    });
  };

  const getField = (field) => {
    dispatch({
      type: "GET_FIELD",
      field: field,
    })
  }
  return (
    <GlobalContext.Provider
      value={{ fields: state.fields, addField, updateField }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};