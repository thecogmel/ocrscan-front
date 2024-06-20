import React from 'react';

import { Skeleton } from '@mui/material';

const OCRCardLoading: React.FC = () => {
  return (
    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-12 rounded-lg">
      <div className="flex flex-row">
        <Skeleton variant="rounded" width={40} height={40} />
        <h1 className="ml-3 w-full">
          <Skeleton height={40} />
        </h1>
      </div>
      <div className="mt-2">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default OCRCardLoading;
