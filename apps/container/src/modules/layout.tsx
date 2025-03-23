import React, { FC, Suspense } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { CardButton } from './components/card-button';

export const Layout: FC = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <Typography
            mt={13}
            variant="h2"
            sx={{ color: '#e4cd84' }}
            align="center"
          >
            Optimized Home
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: '#e4cd84', mt: 2 }}
            align="center"
          >
            Your Dream Space, Tailored to Perfection
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: '#e4cd84', mt: 2 }}
            align="center"
          >
            Home Renovations | Kitchen Cabinet Design | Custom Closets
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', mt: 2 }} align="center">
            {'<<< Coming Soon >>>'}
          </Typography>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            sx={{ mt: 5, maxWidth: 1000 }}
            flexGrow={1}
            my={2}
          >
            <Grid item display="flex" justifyContent={'center'} xs={12} md={4}>
              <CardButton
                imageUrl="/images/closet-entry.webp"
                title="Optimized Closets"
                des="Custom Closets Tailored to Your Needs"
              />
            </Grid>
            <Grid item display="flex" justifyContent={'center'} xs={12} md={4}>
              <CardButton
                imageUrl="/images/kitchen-entry.jpg"
                title="Optimized Kitchen "
                des="Kitchen Cabinet Design Tailored to Your Needs"
              />
            </Grid>
            <Grid item display="flex" justifyContent={'center'} xs={12} md={4}>
              <CardButton
                imageUrl="/images/renovation-entry.jpg"
                title="Optimized Renovation"
                des="Home Renovations Tailored to Your Needs"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
