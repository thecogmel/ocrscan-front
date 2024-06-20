'use client';

import { signOut } from 'next-auth/react';
import { cookies } from 'next/headers';
import { enqueueSnackbar } from 'notistack';

export const fetchClient = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> => {
  const token = cookies().get('jwt');

  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    await signOut();
  }
  return response;
};
