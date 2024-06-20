'use client';

import React from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToggle } from 'ahooks';
import { FormikProvider, useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { FaGithub } from 'react-icons/fa6';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import * as yup from 'yup';

import { errors } from '@utils';

const LoginForm: React.FC = () => {
  const [state, { toggle }] = useToggle();

  const fetchLogin = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await fetch('http://localhost:1234/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      enqueueSnackbar('Login successful', { variant: 'success' });
    },
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().email(errors.email).trim().required(errors.required),
      password: yup
        .string()
        .min(8, errors.minLength(8))
        .required(errors.required),
    }),
    onSubmit: async (values) => {
      //fetchLogin.mutateAsync(values);
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/home',
      });
    },
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <TextField
                fullWidth
                size="small"
                id="password"
                name="password"
                placeholder="********"
                type={state ? ' text' : 'password'}
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
                        onClick={toggle}
                        edge="end"
                      >
                        {state ? <MdVisibilityOff /> : <MdVisibility />}
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
              loading={false}
              fullWidth
              onClick={() => formik.handleSubmit()}
            >
              Login
            </LoadingButton>
          </div>
        </FormikProvider>

        <Divider className="my-6">
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
        <div className="flex justify-center ">
          <Button variant="outlined" fullWidth startIcon={<FaGithub />}>
            Sign in with Github
          </Button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link
            href="https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
