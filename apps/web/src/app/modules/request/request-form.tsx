'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Autocomplete, Box, Snackbar, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { PrimaryButton } from '@packages/atoms';
import { ICity, IRequest, ISubcategory } from '@packages/common';
import { PatternFormat } from 'react-number-format';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
const useStyles = makeStyles((theme: Theme) => ({
  headerWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 50px',
    alignItems: 'center',
    textAlign: 'center',
    borderBottom: '1px solid lightgray',
    margin: '0 25px',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 600,
  },
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  actionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    columnGap: 10,
  },
}));
interface RequestFormProps {
  cities: ICity[];
  subcategories: ISubcategory[];
}

const baseApiURL = process.env.NEXT_PUBLIC_BASE_URL;

const postConsultationRequest = async (
  requestPayload: IRequest,
): Promise<any> => {
  const { data } = await axios.post(`${baseApiURL}request`, {
    ...requestPayload,
  });
  return data; // Explicitly return the data
};

export const RequestForm: React.FC<RequestFormProps> = ({
  cities,
  subcategories,
}) => {
  const initialValues: IRequest = {
    id: undefined,
    datetime: '',
    customer_name: '',
    email: '',
    phone: '',
    phone_alt: '',
    schedule: '',
    note: '',
    media1: '',
    media2: '',
    media3: '',
    subcategories: '',
    city_id: 0,
    seen: false,
    is_online: true,
  };
  const classes = useStyles({ grid: '1fr 1fr' });
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    ISubcategory[]
  >([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const validationSchema = Yup.object().shape({
    customer_name: Yup.string().required('Required'),
    city_id: Yup.number().min(1, 'Required').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    subcategories: Yup.string().required('Required'),
  });

  const mutation = useMutation<IRequest, Error, IRequest>({
    mutationFn: postConsultationRequest,
    onSuccess: (data) => {
      setShowToast(true);
      setToastMessage('Request submitted successfully!');
    },
    onError: (error) => {
      setShowToast(true);
      setToastMessage('Error submitting request');
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate({
        ...values,
        datetime: new Date().toISOString(),
      });
    },
  });
  const {
    setFieldValue,
    handleChange,
    errors,
    values,
    touched,
    resetForm,
    isValid,
    dirty,
  } = formik;

  useEffect(() => {
    if (selectedSubcategories.length > 0) {
      const subcategoryTitles = selectedSubcategories.map(
        (subcategory: ISubcategory) => subcategory.title,
      );
      setFieldValue('subcategories', subcategoryTitles.join(', '));
    } else {
      setFieldValue('subcategories', '');
    }
  }, [selectedSubcategories, setFieldValue]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className={classes.headerWrapper}>
        {'Schedule a Free Design Consultation'}
      </Box>
      <Box className={classes.fieldsWrapper}>
        <TextField
          required
          type="text"
          fullWidth
          size="small"
          name="customer_name"
          label="Name"
          value={values.customer_name}
          onChange={handleChange}
          error={touched.customer_name && errors?.customer_name ? true : false}
          helperText={errors?.customer_name}
        />
        <TextField
          required
          type="text"
          size="small"
          fullWidth
          name="email"
          label="Email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && errors?.email ? true : false}
          helperText={errors?.email}
        />
        <Autocomplete
          disablePortal
          fullWidth
          size="small"
          id="combo-box-demo"
          options={cities || []}
          getOptionLabel={(option) => option?.name}
          value={
            cities?.find((item: ICity) => item.id === values.city_id) || null
          }
          onChange={(_, selectedItem) =>
            setFieldValue('city_id', selectedItem?.id)
          }
          renderInput={(params) => (
            <TextField
              required
              {...params}
              label="City"
              error={touched.city_id && errors.city_id ? true : false}
              helperText={touched.city_id && errors.city_id}
            />
          )}
        />
        <PatternFormat
          required
          type="text"
          id="ExistingGiftCard-CardNumber"
          label="Phone"
          name="phone"
          size="small"
          value={values.phone}
          onChange={handleChange}
          customInput={TextField}
          error={touched.phone && errors.phone ? true : false}
          helperText={touched.phone && errors.phone}
          style={{ width: '100%' }}
          format="(###) ###-####"
        />
        <Autocomplete
          multiple
          fullWidth
          size="small"
          limitTags={2}
          disablePortal
          id="combo-box-demo"
          options={subcategories || []}
          value={selectedSubcategories}
          getOptionLabel={(option) => option?.title}
          onChange={(_, selectedItem) => {
            if (selectedItem) setSelectedSubcategories(selectedItem);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Area of Interests?" />
          )}
        />
        <TextField
          type="text"
          fullWidth
          multiline
          rows={3}
          name="note"
          label="Note"
          placeholder=""
          value={values.note}
          onChange={handleChange}
        />
        <Box className={classes.actionWrapper}>
          <PrimaryButton
            type="button"
            // disabled={Object.keys(errors).length > 0 || !dirty}
            onClick={() => {
              resetForm();
              setSelectedSubcategories([]);
            }}
          >
            Clear Form
          </PrimaryButton>
          <PrimaryButton type="submit" disabled={!(isValid && dirty)}>
            Submit Request
          </PrimaryButton>
        </Box>

        <Snackbar
          open={showToast}
          autoHideDuration={6000}
          onClose={() => setShowToast(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowToast(false)}
            severity={
              toastMessage === 'Request submitted successfully!'
                ? 'success'
                : 'error'
            }
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
};
