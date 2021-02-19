import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function TablePartBody(props) {
  const { data, columns } = props;
  return (
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          <TableCell align="left">{row.acc_name}</TableCell>
          <TableCell align="left">{row.total_amount}</TableCell>
          <TableCell align="left">{row.created_at}</TableCell>
          <TableCell align="left">{row.receipt_type}</TableCell>
          <TableCell align="left">{row.total_amount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
