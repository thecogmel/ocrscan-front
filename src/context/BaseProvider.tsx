'use client';

import React from 'react';

import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { BuildTheme } from 'theme/Theme';

interface BaseProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

const BaseProvider: React.FC<BaseProviderProps> = ({ children, session }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={BuildTheme('light')}>
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default BaseProvider;
