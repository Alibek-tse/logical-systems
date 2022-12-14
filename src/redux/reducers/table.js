import { SET_TABLE_DATA } from "../constants";

const initialState = {
  tableData: [],
};

const table = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_DATA:
      return { ...state, tableData: action.payload };
    default:
      return state;
  }
};

export default table;
