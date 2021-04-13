import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

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
            placeholder = {props.data.ask_price.substring(1).split(".")[0]}
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
                placeholder = {props.data.ask_price.substring(1).split(".")[1]}
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