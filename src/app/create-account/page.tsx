'use client';

import React from 'react';

import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToggle } from 'ahooks';
import { FormikProvider, useFormik } from 'formik';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import * as yup from 'yup';

import { errors } from '@utils';

const CreateAccount: React.FC = () => {
  const router = useRouter();
  const passwordToggle = useToggle();
  const confirmPasswordToggle = useToggle();

  const requestNewUSer = useMutation({
    mutationFn: async (values: CreateUserFormValues) => {
      return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.name,
        }),
      });
    },
    onSuccess: () => {
      enqueueSnackbar('Usuário criado com sucesso', { variant: 'success' });
      router.push('/');
    },
    onError: () => {
      enqueueSnackbar('Erro na criação de usuário', { variant: 'error' });
    },
  });

  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '', name: '' },
    validationSchema: yup.object({
      email: yup.string().email(errors.email).trim().required(errors.required),
      name: yup.string().required(errors.required),
      password: yup
        .string()
        .min(8, errors.minLength(8))
        .required(errors.required),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], errors.passwordConfirm)
        .required(errors.required),
    }),
    onSubmit: (values) => requestNewUSer.mutateAsync(values),
  });
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          OCR Scan
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-12 rounded-lg space-y-6">
        <FormikProvider value={formik}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="example@example.com"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <TextField
                fullWidth
                id="name"
                name="name"
                placeholder="John Doe"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                size="small"
                id="password"
                name="password"
                placeholder="********"
                type={passwordToggle[0] ? ' text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={passwordToggle[1].toggle}
                        edge="end"
                      >
                        {passwordToggle[0] ? (
                          <MdVisibilityOff />
                        ) : (
                          <MdVisibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                size="small"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                type={confirmPasswordToggle[0] ? ' text' : 'password'}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={confirmPasswordToggle[1].toggle}
                        edge="end"
                      >
                        {confirmPasswordToggle[0] ? (
                          <MdVisibilityOff />
                        ) : (
                          <MdVisibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div>
            <LoadingButton
              variant="contained"
              size="large"
              type="submit"
              loading={requestNewUSer.isPending}
              fullWidth
              onClick={() => formik.handleSubmit()}
            >
              Criar usuário
            </LoadingButton>
          </div>
        </FormikProvider>
      </div>
    </div>
  );
};

export default CreateAccount;
