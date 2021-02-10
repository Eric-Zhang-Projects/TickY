import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
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
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.email}
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
    
          <button type="submit">Submit</button>
        </form>
      );
}

export default LoginForm;