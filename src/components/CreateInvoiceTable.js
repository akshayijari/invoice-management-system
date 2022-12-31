import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

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
        {itemList.map((item) => (
          <tr key={item.itemName}>
            <td className="text-sm">{item.itemName}</td>
            <td className="text-sm">{item.itemQuantity}</td>
            <td className="text-sm">{item.itemRate}</td>
            <td className="text-sm text-right">{item.itemCost}</td>
            <td> 
              <DeleteIcon color="error" onClick={()=>deleteItem(item.itemName)} />
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