import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BidForm = (props) => {
    console.log(props);
    const formik = useFormik({
        initialValues: {
            dollars: '',
            cents: ''
        },
        validationSchema: Yup.object({
            dollars: Yup.string()
                //.positive()
                .required('Required'),
            cents: Yup.string()
            //.positive()
          }),
        onSubmit: values => {
            props.onSubmit(props.data.auction_id, values.dollars.toString() + "." + values.cents.toString())
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="dollars">Bid Price: $</label>
          <input
          className = "InputBidDollars"
            id="dollars"
            type="text"
            {...formik.getFieldProps('dollars')}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.email}
          />
          {formik.touched.dollars && formik.errors.dollars ? (
            <div>{formik.errors.dollars}</div>
          ) : null}
            <label htmlFor="dollars">.</label>
                <input
                className = "InputBidDollars"
                id="cents"
                type="text"
                {...formik.getFieldProps('cents')}
            />
            {formik.touched.cents && formik.errors.cents ? (
                <div>{formik.errors.cents}</div>
            ) : null}
    
          <button type="submit">Submit</button>
        </form>
      );
}

export default BidForm;