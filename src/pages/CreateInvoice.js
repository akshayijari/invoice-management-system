import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CreateInvoiceTable from '../components/CreateInvoiceTable';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoice } from '../redux/invoice';
import { addDoc, collection, serverTimestamp, updateDoc, doc, onSnapshot } from '@firebase/firestore';
import db from '../firebase';
import Nav from '../components/Nav';
import { showToast } from '../utils/functions';
import Loading from '../components/Loading';

const CreateInvoice = () => {

  const [isEdit, setIsEdit] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerDist, setCustomerDist] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [customerGSTN, setCustomerGSTN] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [customerEway, setCustomerEway] = useState('');
  const [customerBillDate, setCustomerBillDate] = useState('');
  const [customerDestination, setCustomerDestination] = useState('');
  const [customerVehicleNo, setCustomerVehicleNo] = useState('');
  const [customerDispatchedThrough, setCustomerDispatchedThrough] = useState('');
  const [customerDeliveryTerms, setCustomerDeliveryTerms] = useState('');
  
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemCode, setItemCode] = useState('');
  const [itemUnit, setItemUnit] = useState('');
  const [itemCost, setItemCost] = useState(0);
  const [itemRate, setItemRate] = useState(0);
  const [itemRatewithoutGST, setItemRatewithoutGST] = useState(0);
  const [itemCGST, setItemCGST] = useState(2.5);
  const [itemSGST, setItemSGST] = useState(2.5);
  const [priceRoundoff, setpriceRoundoff] = useState(0.0);
  const [itemList, setItemList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  const [invoiceDetails, setInvoiceDetails] = useState(null);

  let params = useParams();
  useEffect(() => {
    if (!user.id) return navigate('/login');
    setLoading(false);
    console.log('params', params);
  }, [navigate, user.id]);

  useEffect(() => {
    console.log('inside 11 =====');
    if (!user.id) return navigate('/login');
    try {
      console.log('inside 22 =====');
      if (params.id) {
        console.log('inside 33 =====');
        const unsub = onSnapshot(doc(db, 'invoices', params.id), (doc) => {
          console.log('inside 44 =====', doc.data());
          setInvoiceDetails({ data: doc.data(), id: doc.id });
          setIsEdit(true)
          setItemList(doc.data().itemList)
          setCustomerName(doc.data().customerName)
          setCustomerAddress(doc.data().customerAddress)
          setCustomerCity(doc.data().customerCity)
          setCustomerDist(doc.data().customerDist)
          setCustomerState(doc.data().customerState)
          setCustomerPincode(doc.data().customerPincode)
          setCustomerGSTN(doc.data().customerGSTN)
          setCustomerEmail(doc.data().customerEmail)
          setCustomerPhone(doc.data().customerPhone)
          setCurrency(doc.data().currency)
          setCustomerEway(doc.data().customerEway)
          setCustomerBillDate(doc.data().customerBillDate)
          setCustomerDestination(doc.data().customerDestination)
          setCustomerVehicleNo(doc.data().customerVehicleNo)
          setCustomerDispatchedThrough(doc.data().customerDispatchedThrough)
          setCustomerDeliveryTerms(doc.data().customerDeliveryTerms)
        });
        setLoading(false);
        return () => unsub();
      }
    } catch (error) {
      console.error(error);
    }
  },[]);

  useEffect(() => {
    setItemCost(itemQuantity*itemRatewithoutGST)
  }, [itemRatewithoutGST, itemQuantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
      setItemList([
        ...itemList,
        {
          itemName,
          itemCost,
          itemQuantity,
          itemCode,
          itemUnit,
          itemRatewithoutGST,
          itemCGST,
          itemSGST,
          priceRoundoff,
          itemList,
        },
      ]);
    }
    setItemName('');
    setItemCode('')
    setItemCost(0);
    setItemQuantity(1);
    setItemUnit('')
    setItemRate(0);
    setItemRatewithoutGST(0);
  };

  const saveInvoice = async (e) => {
    e.preventDefault();
    dispatch(
      setInvoice({
        customerName,
        customerAddress,
        customerCity,
        customerEmail,
        itemList,
        currency,
      })
    );

    await addDoc(collection(db, 'invoices'), {
      user_id: user.id,
      timestamp: serverTimestamp(),
      customerName,customerAddress,customerCity,customerDist,customerState,customerPincode,customerGSTN,customerEmail,customerPhone,currency,
      customerEway,customerBillDate,customerDestination,customerVehicleNo,customerDispatchedThrough,customerDeliveryTerms,itemList,
    })
      .then(() => {
        showToast('success', 'Invoice created!📜');
      })
      .then(() => navigate('/dashboard'))
      .catch((err) => {
        showToast('error', 'Try again! Invoice not created!😭');
      });
  };

  const updateInvoice = async (e) => {
    e.preventDefault();
    dispatch(
      setInvoice({
        customerName,
        customerAddress,
        customerCity,
        customerEmail,
        itemList,
        currency,
      })
    );
    await updateDoc(doc(db, 'invoices', params.id), {
      user_id: user.id,
      timestamp: serverTimestamp(),
      customerName,customerAddress,customerCity,customerDist,customerState,customerPincode,customerGSTN,customerEmail,customerPhone,currency,
      customerEway,customerBillDate,customerDestination,customerVehicleNo,customerDispatchedThrough,customerDeliveryTerms,itemList,
    }).then(() => {
      showToast('success', 'Invoice updated!📜');
    })
    .catch((err) => {
      showToast('error', 'Try again! Invoice not updated!😭');
    });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Nav />
          <div className="w-full p-3 md:w-2/3 shadow-xl mx-auto mt-8 rounded  my-8 md:p-8">
            <h3 className="text-center font-bold text-xl mb-4">
              Create an invoice
            </h3>

            <form
              className="w-full mx-auto flex flex-col"
              onSubmit={isEdit?updateInvoice: saveInvoice}
            >
              <label htmlFor="customerName" className="text-sm">
                Customer's Name
              </label>
              <input
                type="text"
                required
                name="customerName"
                className="py-2 px-4 bg-gray-100 w-full mb-6"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <div className="flex items-end space-x-3">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerAddress" className="text-sm">
                    Customer's Address
                  </label>
                  <input
                    type="text"
                    required
                    name="customerAddress"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerCity" className="text-sm">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    name="customerCity"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end space-x-3">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerDist" className="text-sm">
                    District
                  </label>
                  <input
                    type="text"
                    required
                    name="customerDist"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerDist}
                    onChange={(e) => setCustomerDist(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerState" className="text-sm">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    name="customerState"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerState}
                    onChange={(e) => setCustomerState(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end space-x-3">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerPincode" className="text-sm">
                    PINCODE
                  </label>
                  <input
                    type="text"
                    required
                    name="customerPincode"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerPincode}
                    onChange={(e) => setCustomerPincode(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="customerPhone" className="text-sm">
                    Phone
                  </label>
                  <input
                    type="text"
                    required
                    name="customerPhone"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="customerGSTN" className="text-sm">
                Customer's GSTN
              </label>
              <input
                type="text"
                required
                name="customerGSTN"
                className="py-2 px-4 bg-gray-100 w-full mb-6"
                value={customerGSTN}
                onChange={(e) => setCustomerGSTN(e.target.value)}
              />

              <div className="flex items-center space-x-4">
                <div className="flex flex-col w-2/3">
                  <label htmlFor="customerEmail" className="text-sm">
                    Customer's Email
                  </label>
                  <input
                    type="email"
                    required
                    name="customerEmail"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/3">
                  <label htmlFor="currency" className="text-sm">
                    Currency
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    minLength={3}
                    name="currency"
                    className="py-2 px-4 bg-gray-100 w-full mb-6"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex justify-between flex-col">
                <h3 className="my-4 font-bold ">Tracking Details</h3>
                <div className="flex items-end space-x-3">
                  <div className="flex flex-col w-2/3">
                    <label htmlFor="customerEway" className="text-sm">
                      Eway
                    </label>
                    <input
                      type="text"
                      required
                      name="customerEway"
                      className="py-2 px-4 bg-gray-100 w-full mb-6"
                      value={customerEway}
                      onChange={(e) => setCustomerEway(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col w-1/3">
                    <label htmlFor="customerBillDate" className="text-sm">
                      Bill Date 
                    </label>
                    <input
                      type="text"
                      required
                      name="customerBillDate"
                      className="py-2 px-4 bg-gray-100 w-full mb-6"
                      value={customerBillDate}
                      onChange={(e) => setCustomerBillDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end space-x-3">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="customerDestination" className="text-sm">
                      Destination
                    </label>
                    <input
                      type="text"
                      required
                      name="customerDestination"
                      className="py-2 px-4 bg-gray-100 w-full mb-6"
                      value={customerDestination}
                      onChange={(e) => setCustomerDestination(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label htmlFor="customerVehicleNo" className="text-sm">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      required
                      name="customerVehicleNo"
                      className="py-2 px-4 bg-gray-100 w-full mb-6"
                      value={customerVehicleNo}
                      onChange={(e) => setCustomerVehicleNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end space-x-3">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="customerDispatchedThrough" className="text-sm">
                      Dispatched Through
                    </label>
                    <input
                      type="text"
                      required
                      name="customerDispatchedThrough"
                      className="py-2 px-4 bg-gray-100 w-full mb-6"
                      value={customerDispatchedThrough}
                      onChange={(e) => setCustomerDispatchedThrough(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label htmlFor="customerDeliveryTerms" className="text-sm">
                      Delivery Terms
                    </label>
                    <input
                      type="text"
                      required
                      name="customerDeliveryTerms"
                      className="py-2 px-4 bg-gray-100 w-full mb-6"
                      value={customerDeliveryTerms}
                      onChange={(e) => setCustomerDeliveryTerms(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between flex-col">
                <h3 className="my-4 font-bold ">Items List</h3>

                <div className="flex items-end space-x-3">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="itemName" className="text-sm">
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      className="py-2 px-4 mb-6 bg-gray-100 w-full"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="itemCode" className="text-sm">
                      Item Code
                    </label>
                    <input
                      type="text"
                      name="itemCode"
                      className="py-2 px-4 mb-6 bg-gray-100"
                      value={itemCode}
                      onChange={(e) => setItemCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="flex flex-col justify-center w-1/3">
                    <label htmlFor="itemQuantity" className="text-sm">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="itemQuantity"
                      className="py-2 px-4 mb-6 bg-gray-100 w-full"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label htmlFor="itemUnit" className="text-sm">
                      Unit
                    </label>
                    <input
                      type="text"
                      name="itemUnit"
                      className="py-2 px-4 mb-6 bg-gray-100 w-full"
                      value={itemUnit}
                      onChange={(e) => setItemUnit(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col w-1/3">
                    <label htmlFor="itemRate" className="text-sm">
                      Rate with GST
                    </label>
                    <input
                      type="number"
                      name="itemRate"
                      className="py-2 px-4 mb-6 bg-gray-100 w-full"
                      value={itemRate}
                      onChange={(e) => {setItemRate(e.target.value); setItemRatewithoutGST((e.target.value*100/(itemCGST+itemSGST+100)))}}
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="flex flex-col justify-center w-1/3">
                    <label htmlFor="itemSGST" className="text-sm">
                      SGST (%)
                    </label>
                    <input
                      type="number"
                      name="itemSGST"
                      disabled
                      className="py-2 px-4 mb-6 bg-gray-100 w-full"
                      value={itemSGST}
                      onChange={(e) => setItemSGST(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label htmlFor="itemCGST" className="text-sm">
                      CGST (%)
                    </label>
                    <input
                      type="number"
                      name="itemCGST"
                      disabled
                      className="py-2 px-4 mb-6 bg-gray-100 w-full"
                      value={itemCGST}
                      onChange={(e) => setItemCGST(e.target.value)}
                      
                    />
                  </div>

                  <div className="flex flex-col w-1/3">
                    <label htmlFor="itemRatewithoutGST" className="text-sm">
                      Rate without GST
                    </label>
                    <input
                      type="number"
                      name="itemRatewithoutGST"
                      className="py-2 px-4 mb-6 bg-gray-100 w-full"
                      value={itemRatewithoutGST}
                      onChange={(e) => {setItemRatewithoutGST(e.target.value); setItemRate((e.target.value*(itemCGST+itemSGST+100)/100))}}
                    />
                  </div>

                </div>
                <div className="flex flex-col justify-center w-1/4">
                  <p className="text-sm">Price</p>
                  <p className="py-2 px-4 mb-6 bg-gray-100">
                    {Number(itemCost).toLocaleString('en-US')}
                  </p>
                </div>
                
                <button
                  className="bg-blue-500 text-gray-100 w-[150px] p-3 rounded my-2"
                  onClick={handleSubmit}
                >
                  Add Item
                </button>
              </div>

              {itemList[0] && <CreateInvoiceTable itemList={itemList} />}

              <button
                className="bg-blue-800 text-gray-100 w-full p-5 rounded my-6"
                type="submit"
              >
                {!isEdit?"SAVE INVOICE":"UPDATE INVOICE"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateInvoice;