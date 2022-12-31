import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { query, collection, where, doc, onSnapshot } from '@firebase/firestore';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import Loading from '../components/Loading';

export const InlineValue = ({name,value}) => {
  return(
    <div className='flex'>
      <p className="text-sm mb-1">{name} : {value}</p>
    </div>
  )
}
export const TableRow = ({name,value, classname}) => {
  return(
    <tr>
      <td colSpan="6" className="text-right font-bold text-xs">
        {name}
      </td>
      <td className={`font-bold uppercase text-xs ${classname}`}>
        {value}
      </td>
    </tr>
  )
}


export const ComponentToPrint = React.forwardRef((props, ref) => {
  let params = useParams();
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.id) return navigate('/login');
    try {
      const q = query(
        collection(db, 'businesses'),
        where('user_id', '==', user.id)
      );
      onSnapshot(q, (querySnapshot) => {
        const firebaseBusinesses = [];
        querySnapshot.forEach((doc) => {
          firebaseBusinesses.push({ data: doc.data(), id: doc.id });
        });
        setBusinessDetails(firebaseBusinesses);
      });
      if (params.id) {
        const unsub = onSnapshot(doc(db, 'invoices', params.id), (doc) => {
          setInvoiceDetails({ data: doc.data(), id: doc.id });
        });
        setLoading(false);
        return () => unsub();
      }
    
    } catch (error) {
      console.error(error);
    }
  }, [params.id, navigate, user.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="w-full w-5/7 mx-auto m-4"
          ref={ref}
        >
          <div className="w-full flex justify-center items-center pt-8">
            <h3 className="text-2xl ">Tax Invoice</h3>
          </div>
          <div className="w-full flex items-center">
            {businessDetails && (
              <div className="w-1/2  px-8 py-4">
                <p className="font-bold text-sm mb-1">
                  {businessDetails[0].data.businessName}
                </p>
                <p className="text-sm mb-1">
                  {businessDetails[0].data.businessAddress},
                </p>
                <p className="text-sm mb-1">
                  {businessDetails[0].data.businessCity}
                </p>
                <p className="text-sm mb-1">
                  {businessDetails[0].data.businessState}-{businessDetails[0].data.businessPincode}
                </p>
                <p className="text-sm mb-1">
                  GSTN : {businessDetails[0].data.businessGSTN}
                </p>
              </div>
            )}
            {invoiceDetails && <div className="w-1/2  px-8 py-4">
              <InlineValue name="Invoice ID" value={invoiceDetails.id.slice(0, 5)} />
              <InlineValue name="Bill Date" value={invoiceDetails.data.customerBillDate} />
              <InlineValue name="E Way Number" value={invoiceDetails.data.customerEway} />
              <InlineValue name="E way Date" value={invoiceDetails.data.customerBillDate} />
              <InlineValue name="Delivery Note" value='' />
              <InlineValue name="Buyer's Order No" value='' />
            </div>}
          </div>
          <div className="w-full flex">
          {invoiceDetails && (
              <div className="w-1/2  px-8 ">
                <h3 className="font-medium mb-2">Billing Address :</h3>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerName}
                </p>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerAddress},
                </p>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerCity}, {invoiceDetails.data.customerDist}
                </p>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerState}, {invoiceDetails.data.customerPincode}
                </p>
                <p className="text-sm mb-1">
                  GSTN : {invoiceDetails.data.customerGSTN}
                </p>
                <p className="text-sm mb-1">
                  {invoiceDetails.data.customerPhone}, {invoiceDetails.data.customerEmail}
                </p>
              </div>
            )}
            {invoiceDetails && (
              <div className="w-1/2 px-8">
                <p className="text-sm mb-1">
                  Destination : {invoiceDetails.data.customerDestination}
                </p>
                <p className="text-sm mb-1">
                  Dispatched Through : {invoiceDetails.data.customerDispatchedThrough}
                </p>
                <p className="text-sm mb-1">
                  Terms of Delivery : {invoiceDetails.data.customerDeliveryTerms}
                </p>
                <p className="text-sm mb-1">
                  Motor Vehicle No : {invoiceDetails.data.customerVehicleNo}
                </p>
              </div>
            )}

          </div>

          <div className=" px-8">
            <table>
              <thead>
                <th>SL. No.</th>
                <th className="text-right text-sm">Description of Goods</th>
                <th className="text-right text-sm">HSN/SAC Code</th>
                <th className="text-right text-sm">Qty</th>
                <th className="text-right text-sm">Unit</th>
                <th className="text-right text-sm">Rate</th>
                <th className="text-right text-sm">Amount</th>
              </thead>
              <tbody>
                {invoiceDetails &&
                  invoiceDetails.data.itemList.map((item, idx) => (
                    <tr key={item.itemName}>
                      <td className="text-xs capitalize">{idx+1}</td>
                      <td className="text-xs capitalize">{item.itemName}</td>
                      <td className="text-xs capitalize text-center">{item.itemCode}</td>
                      <td className="text-xs text-right">
                        {Number(item.itemQuantity).toLocaleString('en-US')}
                      </td>
                      <td className="text-xs capitalize">{item.itemUnit}</td>
                      <td className="text-xs text-right">
                        {Number(item.itemRatewithoutGST).toLocaleString('en-US')}
                      </td>
                      <td className="text-xs text-right">
                        {(
                          Number(item.itemQuantity) * Number(item.itemCost)
                        ).toLocaleString('en-US')}
                      </td>
                    </tr>
                  ))}

                {invoiceDetails && (
                  <>
                  <TableRow name="Total Amount" value={invoiceDetails.data.totalAmount} classname='text-right' />
                  <TableRow name={`CGST (${invoiceDetails.data.itemList[0].itemCGST})%`} value={invoiceDetails.data.cgstAmount} classname='text-right' />
                  <TableRow name={`SGST (${invoiceDetails.data.itemList[0].itemSGST})%`} value={invoiceDetails.data.sgstAmount} classname='text-right' />
                  <TableRow name="Round off" value={invoiceDetails.data.priceRoundoff} classname='text-right' />
                  <TableRow name="Grand Total" value={`${invoiceDetails.data.currency} ${invoiceDetails.data.grandTotal}`} classname='text-right' />
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="w-full flex">
          {businessDetails && businessDetails[0].data.declarations !=='' && (
              <div className="w-1/2  px-8 py-4">
                <h3 className="font-medium mb-2">Declarations:</h3>
                <p className="text-sm mb-1">
                  {businessDetails[0].data.declarations}
                </p>
              </div>
            )}
            {businessDetails && (
              <div className="w-1/2  px-8 py-4">
                <h3 className="font-medium mb-2">Our Bank Details:</h3>
                <p className="text-sm mb-1">
                  Account Holder Name : {businessDetails[0].data.accountName}
                </p>
                <p className="text-sm mb-1">
                  Account Number : {businessDetails[0].data.accountNumber},
                </p>
                <p className="text-sm mb-1">
                  IFSC Code : {businessDetails[0].data.ifscCode}
                </p>
                <p className="text-sm mb-1">
                  Bank Name : {businessDetails[0].data.bankName}
                </p>
                <p className="text-sm mb-1">
                  Bank Branch : {businessDetails[0].data.bankBranch}
                </p>
              </div>
            )}
          </div>

          <div className="w-full flex">
            <div className="w-1/2  px-8 flex flex-col items-center">
              <h3 className="font-medium mb-2">Customer Seal and Signature</h3>
            </div>
            <div className="w-1/2  px-8 h-28 flex flex-col justify-between items-center">
              {businessDetails &&<p className="text-sm mb-1">
                For {businessDetails[0].data.businessName}
              </p>}
              <h3 className="font-medium mb-2">(Authorised Signature)</h3>
            </div>
          </div>

          <footer className="px-8 py-4 bg-gray-200 w-full">
            <p className="text-sm text-center">Thankyou for trading with us.</p>
          </footer>
        </div>
      )}
    </>
  );
});

export const ViewInvoice = () => {
  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex items-center md:justify-start justify-center relative">
        <Tooltip title="Print Invoice">
          <IconButton
            onClick={handlePrint}
            style={{
              position: 'fixed',
              top: '10px',
              right: '100px',
              zIndex: '1000px',
            }}
          >
            <LocalPrintshopIcon color="primary" style={{ fontSize: '50px' }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Go Home">
          <IconButton
            onClick={() => navigate('/dashboard')}
            style={{
              position: 'fixed',
              top: '10px',
              right: '30px',
              zIndex: '1000px',
            }}
          >
            <HomeIcon color="primary" style={{ fontSize: '50px' }} />
            {/* <AddCircleIcon color="primary" sx={{ fontSize: 60 }} /> */}
          </IconButton>
        </Tooltip>

        <ComponentToPrint ref={ComponentRef} />
      </div>
    </>
  );
};