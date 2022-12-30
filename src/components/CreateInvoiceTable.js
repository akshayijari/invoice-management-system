import React from 'react';

const CreateInvoiceTable = ({ itemList, deleteItem, cgstAmount,sgstAmount,totalAmount,grandTotal,priceRoundoff, }) => {
  return (
    <div className="w-full overflow-auto">
      <table>
      <thead>
        <th>Name</th>
        <th>Quantity</th>
        <th>Rate/unit</th>
        <th>Amount</th>
      </thead>

      <tbody>
        {itemList.reverse().map((item) => (
          <tr key={item.itemName}>
            <td className="text-sm">{item.itemName}</td>
            <td className="text-sm">{item.itemRate}</td>
            <td className="text-sm">{item.itemQuantity}</td>
            <td className="text-sm text-right">{item.itemCost}</td>
            <td> 
              <svg onClick={()=>deleteItem(item.itemName)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </td>
          </tr>
        ))}
        <TableRow name="Total Amount" value={totalAmount} classname="ms" />
        <TableRow name="CGST" value={cgstAmount} classname="ms" />
        <TableRow name="SGST" value={sgstAmount} classname="ms" />
        <TableRow name="Roundoff" value={priceRoundoff} classname="ms" />
        <TableRow name="Grand Total" value={grandTotal} classname="ms" />
      </tbody>
    </table>
    </div>
  );
};

const TableRow = ({name,value, classname}) => {
  return(
    <tr>
      <td colSpan="3" className="text-right font-bold text-xs">
        {name}
      </td>
      <td className={`font-bold uppercase text-xs text-right ${classname}`}>
        {value}
      </td>
    </tr>
  )
}

export default CreateInvoiceTable;