import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { query, collection, where, onSnapshot } from '@firebase/firestore';
import db from '../firebase';
import Loading from '../components/Loading';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.id) return navigate('/login');
    try {
      const q = query(
        collection(db, 'invoices'),
        where('user_id', '==', user.id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const firebaseInvoices = [];
        querySnapshot.forEach((doc) => {
          firebaseInvoices.push({ data: doc.data(), id: doc.id });
        });
        setInvoices(firebaseInvoices);
        setLoading(false);
        return () => unsubscribe();
      });
    } catch (error) {
      console.log(error);
    }
  }, [navigate, user.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full">
          <Nav />

          <div className="sm:p-6 flex items-center flex-col p-3 justify-center">
            <Tooltip title="Create invoice">
              <IconButton
                onClick={() => navigate('/new/invoice')}
                style={{
                  position: 'fixed',
                  bottom: '20px',
                  right: '10px',
                  zIndex: '1000px',
                }}
              >
                <AddCircleIcon color="primary" sx={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>

            {invoices.length !== 0 && <Table invoices={invoices} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;