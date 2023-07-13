import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Table from './components/pages/Table';
import NotFound from './components/pages/NotFound';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import { Container, Spinner } from 'react-bootstrap';
import { fetchTables, getTablesLoading } from './redux/tablesRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getTablesLoading);

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center">
        <div
          className="d-flex align-items-center"
          style={{ marginTop: '250px' }}
        >
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/table/:tableId" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
