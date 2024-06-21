'use client';

import React, { useCallback, useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Link from 'next/link';

interface OCRCardProps {
  invoice: Invoice;
}

const OCRCard: React.FC<OCRCardProps> = ({ invoice }) => {
  /*   const token = getCookie('token');
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        fetch('http://localhost:1234/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }, 2000);
  }); */
  const [total, setTotal] = useState(0);

  const calculateTotal = useCallback(() => {
    const total = invoice.items.reduce(
      (acc, item) => acc + item.total_value,
      0
    );
    return total * 1.23;
  }, [invoice.items]);

  return (
    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-6 rounded-lg">
      <h1 className="w-full text-2xl font-bold text-gray-900 mb-2">
        {invoice.url.split('/').pop()}
      </h1>
      <p className="text-sm text-gray-500 w-full">
        Processado:{' '}
        {invoice.processed_at !== null
          ? new Date(invoice.processed_at).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Não'}
      </p>
      <Link
        href={invoice.url}
        target="_blank"
        className="block text-sm truncate text-gray-500"
      >
        URL: {invoice.url}
      </Link>
      <TableContainer component={Paper} className="my-5">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Qnt.</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Item
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Valor unit.
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Valor total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={item.id}
              >
                <TableCell component="th" scope="row">
                  {item.quantity}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">
                  {item.unit_price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell align="right">
                  {item.total_value.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2 className="font-bold text-sm text-gray-500 mt-5 w-full text-right">
        Valor total com impostos:{' '}
        {calculateTotal().toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </h2>
    </div>
  );
};

export default OCRCard;
