'use client';

import React, { Suspense, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import { Button, styled } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { IoMdCloudUpload } from 'react-icons/io';

import OCRCard from '@components/OCRCard';
import OCRCardLoading from '@components/OCRCardLoading';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const { data } = useSession();

  const fetchApi = useQuery({
    queryFn: async () => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            fetch('http://localhost:1234/', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${(data as any)?.apiToken?.access_token}`,
              },
            })
          );
        }, 2000);
      });
    },
    queryKey: ['get'],
  });

  const sendFileRequest = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('file', selectedFile as File);
      return await fetch('http://localhost:1234/invoices/ocr', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${(data as any)?.apiToken?.access_token}`,
        },
        body: formData,
      });
    },
    onSuccess: () => {
      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error uploading file', { variant: 'error' });
    },
  });

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setSelectedFile(selectedFile);
        sendFileRequest.mutate();
      }
    },
    [sendFileRequest]
  );

  return (
    <main>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            OCR Scan
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-12 rounded-lg">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <LoadingButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<IoMdCloudUpload />}
                  fullWidth
                  size="large"
                  loading={sendFileRequest.isPending}
                >
                  Upload file
                  <VisuallyHiddenInput
                    onChange={handleFileChange}
                    type="file"
                  />
                </LoadingButton>
              </div>
            </div>
          </form>
        </div>

        <OCRCard />

        <Button onClick={async () => await signOut()}>Logout</Button>
      </div>
    </main>
  );
};

export default Home;
