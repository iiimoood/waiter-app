import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import { NavLink } from 'react-router-dom';

const Tables = () => {
  const tables = useSelector(getAllTables);

  return (
    <div className="d-flex flex-wrap flex-column w-100">
      {tables.map((table) => (
        <div
          key={table.id}
          className="card col-12 col-md-6 col-lg-4 w-100 border-top-0 border-start-0 border-end-0"
          style={{ height: '85px' }}
        >
          <div className="card-body d-flex flex-row align-items-center position-relative">
            <h3 className="card-title">Table {table.id}</h3>
            <p className="ms-4 mt-auto mb-auto">
              <span className="fw-bold">Status: </span> {table.status}
            </p>
            <button
              type="button"
              className="btn btn-primary position-absolute end-0"
            >
              <NavLink
                to={'/table/' + table.id}
                className="text-decoration-none text-light"
              >
                Show more
              </NavLink>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tables;
