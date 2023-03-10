import { toast } from "react-toastify";

export const showToast = (type, message) => {
  if (type === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export const findGrandTotal = ({ itemList }, currency) => {
  let total = 0;
  for (let i = 0; i < itemList.length; i++) {
    const amount = itemList[i].itemCost * itemList[i].itemQuantity;
    total += amount;
  }
  return `${currency} ${total.toLocaleString("en-US")}`;
};

export const convertTimestamp = (timestamp) => {
  if (timestamp) {
    // const fireBaseTime = new Date(
    //   timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    // );
    // const day =
    //   fireBaseTime.getDate() < 10
    //     ? `0${fireBaseTime.getDate()}`
    //     : fireBaseTime.getDate();
    // const month =
    //   fireBaseTime.getMonth() < 10
    //     ? `0${fireBaseTime.getMonth()}`
    //     : fireBaseTime.getMonth();
    // const year = fireBaseTime.getFullYear();
    // return `${day}-${month}-${year}`;
    return new Date(timestamp.seconds * 1000).toLocaleString();
  } else {
    return "00-00-0000";
  }
};

export const createInvoiceID = (timestamp) => {
  console.log(timestamp);
  const fireBaseTime = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const day =
    fireBaseTime.getDate() < 10
      ? `0${fireBaseTime.getDate()}`
      : fireBaseTime.getDate();
  const month =
    fireBaseTime.getMonth() < 10
      ? `0${fireBaseTime.getMonth()}`
      : fireBaseTime.getMonth();
  const year = fireBaseTime.getFullYear();
  const hour =
    fireBaseTime.getHours() < 10
      ? `0${fireBaseTime.getHours()}`
      : fireBaseTime.getHours();
  const minute =
    fireBaseTime.getMinutes() < 10
      ? `0${fireBaseTime.getMinutes()}`
      : fireBaseTime.getMinutes();
  const second =
    fireBaseTime.getSeconds() < 10
      ? `0${fireBaseTime.getSeconds()}`
      : fireBaseTime.getSeconds();

  return `${second}${minute}${hour}${day}${month}/${year}`;
};

export const getRoundValue = (num) => {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};
