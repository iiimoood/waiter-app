import { useSelector, useDispatch } from 'react-redux';
import { getTableById } from '../../redux/tablesRedux';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getAllStatuses } from '../../redux/statusesRedux';
import { updateTableRequest } from '../../redux/tablesRedux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../styles/global.scss';

const Table = () => {
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const { tableId } = useParams();
  const table = useSelector((state) => getTableById(state, tableId));
  const statuses = useSelector(getAllStatuses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(table?.status || '');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount || '');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    table?.maxPeopleAmount || ''
  );
  const [bill, setBill] = useState(table?.bill || '');

  useEffect(() => {
    if (table) {
      setStatus(table.status);
      setPeopleAmount(table.peopleAmount);
      setMaxPeopleAmount(table.maxPeopleAmount);
      setBill(table.bill);
    }
  }, [table]);

  const handleSubmit = () => {
    dispatch(
      updateTableRequest({
        status,
        peopleAmount,
        maxPeopleAmount,
        bill,
        tableId,
      })
    );
    navigate('/');
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    if (selectedStatus !== 'Busy') {
      setBill('0');
    }
    if (selectedStatus === 'Cleaning' || selectedStatus === 'Free') {
      setPeopleAmount('0');
    }
  };

  

  if (!table) return <Navigate to="/" />;
  return (
    <form onSubmit={validate(handleSubmit)}>
      <h3>Table {table.id}</h3>
      <div className="form-group mb-2">
        <label>Status: </label>
        <select onChange={handleStatusChange} value={status}>
          {statuses.map((status) => (
            <option key={status.name}>{status.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group mb-2">
        <label>People: </label>
        <input
          {...register('peopleAmount', {
            required: true,
            min: 0,
            max: 10,
          })}
          type="number"
          className="form-control w-25 "
          id="peopleAmount"
          onBlur={(e) => {
            let enteredValue = parseInt(e.target.value, 10);
            if (enteredValue > parseInt(maxPeopleAmount, 10)) {
              enteredValue = parseInt(maxPeopleAmount, 10);
            }
            setPeopleAmount(enteredValue);
          }}
          onChange={(e) => setPeopleAmount(e.target.value)}
          value={peopleAmount}
        />
        {errors.peopleAmount && (
          <small className="d-block form-text text-danger mt-2">
            Incorrect value (Min is 0/Max is 10)
          </small>
        )}
        /
        <input
          {...register('maxPeopleAmount', {
            required: true,
            min: 0,
            max: 10,
          })}
          type="number"
          className="form-control w-25 "
          id="maxPeopleAmount"
          onChange={(e) => setMaxPeopleAmount(e.target.value)}
          value={maxPeopleAmount}
        />
        {errors.maxPeopleAmount && (
          <small className="d-block form-text text-danger mt-2">
            Incorrect value (Min is 0/Max is 10)
          </small>
        )}
      </div>
      {status === 'Busy' && (
        <div className="form-group mb-2">
          <label>Bill: </label>
          $
          <input
            type="number"
            className="form-control w-25 "
            id="bill"
            onChange={(e) => setBill(e.target.value)}
            value={bill}
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default Table;
