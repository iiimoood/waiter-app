import { API_URL } from '../config';

const initialState = {
  data: [],
  loading: false,
};

//selectors
export const getAllTables = ({ tables }) => tables.data;
export const getTableById = ({ tables }, tableId) =>
  tables.data.find((table) => table.id === tableId);
export const getTablesLoading = ({ tables }) => tables.loading;

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const FETCH_TABLES_REQUEST = createActionName('FETCH_TABLES_REQUEST');

// action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });
export const fetchTablesRequest = () => ({
  type: FETCH_TABLES_REQUEST,
});

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchTablesRequest());
    fetch(`${API_URL}/tables`)
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
  };
};

export const updateTableRequest = ({
  status,
  peopleAmount,
  maxPeopleAmount,
  bill,
  tableId,
}) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: tableId,
        status,
        peopleAmount,
        maxPeopleAmount,
        bill,
      }),
    };

    fetch(`${API_URL}/tables` + tableId, options)
      .then((res) => res.json())
      .then(() =>
        dispatch(
          updateTable({
            id: tableId,
            status,
            peopleAmount,
            maxPeopleAmount,
            bill,
          })
        )
      );
  };
};

const tablesReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLES_REQUEST:
      return {
        ...statePart,
        loading: true,
      };
    case UPDATE_TABLES:
      return {
        ...statePart,
        data: [...action.payload],
        loading: false,
      };
    case UPDATE_TABLE:
      return {
        ...statePart,
        data: statePart.data.map((table) =>
          table.id === action.payload.id
            ? { ...table, ...action.payload }
            : table
        ),
      };
    default:
      return statePart;
  }
};
export default tablesReducer;
