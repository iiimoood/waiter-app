import { useSelector } from 'react-redux';
import { getTableById } from '../../redux/tablesRedux';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { getAllStatuses } from '../../redux/statusesRedux';

const Table = ({ action, state }) => {
  const { tableId } = useParams();
  const table = useSelector((state) => getTableById(state, tableId));
  const statuses = useSelector(getAllStatuses);

  const [status, setStatus] = useState(table.status || '');
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount || '');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    table.maxPeopleAmount || ''
  );
  const [bill, setBill] = useState(table.bill || '');

  const handleSubmit = () => {
    action({ status, peopleAmount, maxPeopleAmount, bill });
  };

  if (!table) return <Navigate to="/" />;
  return (
    <form onSubmit={handleSubmit}>
      <h3>Table {table.id}</h3>
      <div className="form-group mb-2">
        <label>Status: </label>
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          {statuses.map((status) => (
            <option key={status.name}>{status.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group mb-2">
        <label>People: </label>
        <input
          type="text"
          className="form-control w-25"
          id="peopleAmount"
          onChange={(e) => setPeopleAmount(e.target.value)}
          value={peopleAmount}
        />
        /
        <input
          type="text"
          className="form-control w-25"
          id="maxPeopleAmount"
          onChange={(e) => setMaxPeopleAmount(e.target.value)}
          value={maxPeopleAmount}
        />
      </div>
      <div className="form-group mb-2">
        <label>Bill: </label>
        $
        <input
          type="text"
          className="form-control w-25"
          id="bill"
          onChange={(e) => setBill(e.target.value)}
          value={bill}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default Table;
