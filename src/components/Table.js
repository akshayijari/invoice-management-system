import React from "react";
import { convertTimestamp } from "../utils/functions";
import DashboardActionsSvg from "./DashboardActionsSvg";

const Table = ({ invoices }) => {
  console.log("invoices", invoices);
  return (
    <div className="w-full">
      <h3 className="text-xl text-blue-700 font-semibold pb-6">
        Recent Invoices{" "}
      </h3>
      <div className="w-full overflow-auto">
        <table>
          <thead>
            <tr>
              <th className="text-blue-600 text-center">Customer Name</th>
              <th className="text-blue-600 text-center">Invoice No.</th>
              <th className="text-blue-600 text-center">Created Time</th>
              <th className="text-blue-600 text-center">City</th>
              <th className="text-blue-600 text-center">GSTN</th>
              <th className="text-blue-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="text-sm">{invoice.data.customerName}</td>
                <td className="text-sm">{invoice.data.invoiceNo}</td>
                <td className="text-sm">
                  {convertTimestamp(invoice.data.updated_timestamp)}
                </td>
                <td className="text-sm">{invoice.data.customerCity}</td>
                <td className="text-sm">{invoice.data.customerGSTN}</td>
                <td>
                  <DashboardActionsSvg invoiceId={invoice.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
