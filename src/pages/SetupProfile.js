import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { storage } from '../firebase';
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
} from '@firebase/firestore';

import { useSelector } from 'react-redux';
import db from '../firebase';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import { showToast } from '../utils/functions';

const SetupProfile = (aa) => {
  console.log('aa', aa)
  const user = useSelector((state) => state.user.user);
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [businessPincode, setBusinessPincode] = useState('');
  const [businessGSTN, setBusinessGSTN] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [declarations, setDeclarations] = useState('');
  const [notesForUser, setNotesForUser] = useState('');
  
  const [logo, setLogo] = useState(
    'https://www.pesmcopt.com/admin-media/images/default-logo.png'
  );

  const navigate = useNavigate();
  const {state} = useLocation();
  const [loading, setLoading] = useState(true);
  const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    if (!user.id) return navigate('/login');
    try {
      const q = query(
        collection(db, 'businesses'),
        where('user_id', '==', user.id)
      );
      
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const business = [];
        querySnapshot.forEach((doc) => {
          business.push(doc.data().name);
        });
        setLoading(false);
        console.log('business.length ', business.length)
        if(business.length > 0 ){setIsFirst(false)}
        if( state.source === 'from_login' && business.length > 0 ){
          navigate('/dashboard');
        }
        const q = query(collection(db, "businesses"), where('user_id', '==', user.id));
        const getExsistingDetails = await getDocs(q);
        getExsistingDetails.forEach((doc) => {
          console.log('docdata',doc.id, getExsistingDetails);
          const res = doc.data()
          setBusinessName(res.businessName)
          setBusinessAddress(res.businessAddress)
          setBusinessCity(res.businessCity)
          setBusinessState(res.businessState)
          setBusinessPincode(res.businessPincode)
          setBusinessGSTN(res.businessGSTN)
          setAccountName(res.accountName)
          setAccountNumber(res.accountNumber)
          setIfscCode(res.ifscCode)
          setBankName(res.bankName)
          setBankBranch(res.bankBranch)
          setDeclarations(res.declarations)
          setNotesForUser(res.notesForUser)
        });
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [navigate, user.id]);

  const handleFileReader = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setLogo(readerEvent.target.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('button clicked', isFirst);
    try{
    let docRefID;

    if(isFirst){
      docRefID = await addDoc(collection(db, 'businesses'), {
        user_id: user.id,
        businessName,
        businessAddress,
        businessCity,
        businessState,
        businessPincode,
        businessGSTN,
        accountName,
        accountNumber,
        ifscCode,
        bankName,
        bankBranch,
        declarations,
        notesForUser,
      });
    }
    else{
      const q1 = query(collection(db, "businesses"), where('user_id', '==', user.id));
      const getExsistingDocRef = await getDocs(q1);
      getExsistingDocRef.forEach((doc) => {
        docRefID = doc.id;
      })
      await updateDoc(doc(db, 'businesses', docRefID), {
        user_id: user.id,
        businessName,
        businessAddress,
        businessCity,
        businessState,
        businessPincode,
        businessGSTN,
        accountName,
        accountNumber,
        ifscCode,
        bankName,
        bankBranch,
        declarations,
        notesForUser,
      });

    }
    const imageRef = ref(storage, `businesses/${docRefID}/image`);
    if (
      logo !== 'https://www.pesmcopt.com/admin-media/images/default-logo.png'
    ) {
      await uploadString(imageRef, logo, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'businesses', docRefID), {
          logo: downloadURL,
        });
        showToast('success', 'Your profile has been created!');
      });
      navigate('/dashboard');
    }
    else{
      navigate('/dashboard');
    }
  }
  catch(error){
    console.log(error);
    showToast('error', 'Sorry some error while updating the details, Please try again.');
  }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Nav />
          <div className="w-full md:p-8 md:w-2/3 md:shadow mx-auto mt-8 rounded p-3 my-8">
            <h3 className="text-center font-bold text-xl mb-6">
              Setup Business Profile
            </h3>

            <form
              className="w-full mx-auto flex flex-col"
              onSubmit={handleSubmit}
            >
              <label htmlFor="businessName" className="text-sm">
                Name
              </label>
              <input
                type="text"
                required
                className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                name="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />

              <div className="flex items-end space-x-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="businessAddress" className="text-sm">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                    name="businessAddress"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="businessCity" className="text-sm">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                    name="businessCity"
                    value={businessCity}
                    onChange={(e) => setBusinessCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="businessState" className="text-sm">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                    name="businessState"
                    value={businessState}
                    onChange={(e) => setBusinessState(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="businessPincode" className="text-sm">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                    name="businessPincode"
                    value={businessPincode}
                    onChange={(e) => setBusinessPincode(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="businessGSTN" className="text-sm">
                GSTN
              </label>
              <input
                type="text"
                required
                className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                name="businessGSTN"
                value={businessGSTN}
                onChange={(e) => setBusinessGSTN(e.target.value)}
              />

              <h3 className="text-center font-bold text-xl mb-6">
                Setup Business Bank Details
              </h3>
              <label htmlFor="accountName" className="text-sm">
                Account Holder Name
              </label>
              <input
                type="text"
                required
                className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                name="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />

              <div className="flex items-end space-x-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="accountNumber" className="text-sm">
                    Account Number
                  </label>
                  <input
                    type="number"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 rounded"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="bankName" className="text-sm">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                    name="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="ifscCode" className="text-sm">
                    IFSC Code
                  </label>
                  <input
                    type="number"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 rounded"
                    name="ifscCode"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="bankBranch" className="text-sm">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    required
                    className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                    name="bankBranch"
                    value={bankBranch}
                    onChange={(e) => setBankBranch(e.target.value)}
                  />
                </div>
              </div>

              <h3 className="text-center font-bold text-xl mb-6">
                Additional Details
              </h3>
              <label htmlFor="declarations" className="text-sm">
                Declarations
              </label>
              <input
                type="text"
                required
                className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                name="declarations"
                value={declarations}
                onChange={(e) => setDeclarations(e.target.value)}
              />
              <label htmlFor="notesForUser" className="text-sm">
                Any notes for customers ?
              </label>
              <input
                type="text"
                required
                className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded"
                name="notesForUser"
                value={notesForUser}
                onChange={(e) => setNotesForUser(e.target.value)}
              />
              <div className="flex items-center space-x-4 w-full">
                <div className="flex flex-col w-1/2">
                  <img
                    src={logo}
                    alt="Logo"
                    className=" w-full max-h-[300px]"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="logo" className="text-sm mb-1">
                    {logo ===
                      'https://www.pesmcopt.com/admin-media/images/default-logo.png' &&
                      'Upload logo'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full mb-6  rounded"
                    name="logo"
                    onChange={handleFileReader}
                  />
                </div>
              </div>

              <button className="bg-blue-800 text-gray-100 w-full p-5 rounded my-6">
                {isFirst?'COMPLETE PROFILE':'UPDATE PROFILE'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SetupProfile;