import React from 'react';
import DashboardActionsSvg from './DashboardActionsSvg';
import { convertTimestamp } from '../utils/functions';

const Table = ({ invoices }) => {
  console.log('invoices', invoices);
  return (
    <div className="w-full overflow-auto">
      <h3 className="text-xl text-blue-700 font-semibold">Recent Invoices </h3>
      <table>
        <thead>
          <tr>
            <th  className="text-blue-600">Customer</th>
            <th  className="text-blue-600">Invoice No.</th>
            <th  className="text-blue-600">City</th>
            <th  className="text-blue-600">GSTN</th>
            <th  className="text-blue-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td  className='text-sm'>{invoice.data.customerName}</td>
              <td className='text-sm'>{invoice.data.invoiceNo}</td>
              {/* <td className='text-sm'>{convertTimestamp(invoice.data.timestamp)}</td> */}
              <td  className='text-sm'>{invoice.data.customerCity}</td>
              <td  className='text-sm'>{invoice.data.customerGSTN
          }</td>
              <td>
                <DashboardActionsSvg invoiceId={invoice.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;