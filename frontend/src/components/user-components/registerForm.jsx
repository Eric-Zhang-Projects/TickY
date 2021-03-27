import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterForm = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
            passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords Must Match')
          }),
        onSubmit: values => {
            props.submitForm(values)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
    
        <label htmlFor="password">Password</label>
            <input
                id="password"
                type="text"
                {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}

        <label htmlFor="password">Password</label>
            <input
                id="passwordConfirmation"
                type="text"
                {...formik.getFieldProps('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                <div>{formik.errors.passwordConfirmation}</div>
            ) : null}
    
          <button type="submit">Submit</button>
        </form>
      );
}

export default RegisterForm;