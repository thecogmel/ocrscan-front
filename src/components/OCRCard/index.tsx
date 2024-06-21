'use client';

import React from 'react';

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
              <TableCell>Qnt.</TableCell>
              <TableCell align="right">Item</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>
              <TableCell align="right">Batata</TableCell>
              <TableCell align="right">R$ 2,00</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>
              <TableCell align="right">Batata</TableCell>
              <TableCell align="right">R$ 2,00</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>
              <TableCell align="right">Batata</TableCell>
              <TableCell align="right">R$ 2,00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h2 className="font-bold text-sm text-gray-500 mt-5 w-full text-right">
        Valor total: R$325,00
      </h2>
    </div>
  );
};

export default OCRCard;
