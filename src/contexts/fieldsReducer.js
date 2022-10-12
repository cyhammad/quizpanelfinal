const fieldsReducer = (state, action) => {
    switch (action.type) {
      case "ADD_Field": {
        const newField = {
          id: state.currentId,
          ques: "",
          ans: "",
        };
        const updatedFields = [...state.fields, newField];
        return {
          ...state,
          currentId: state.currentId + 1,
          fields: updatedFields,
        };
      }
  
      case "UPDATE_FIELD": {
        const index = state.fields.findIndex(
          (field) => field.id === action.field.id
        );
        const updatedField = action.field;
  
        const updatedFields = state.fields;
        updatedFields[index] = updatedField;
  
        return {
          ...state,
          fields: updatedFields,
        };
      }
  
      default: {
        return state;
      }
    }
  };
  
  export default fieldsReducer;
  