import { FC } from 'react';
import {
  Button,
  ButtonProps,
  CircularProgress,
  ThemeProvider,
} from '@mui/material';
import { goldenBlackTheme } from '@packages/common';

type PrimaryButtonProps = ButtonProps & {
  handleClick?: () => void;
  loading?: boolean;
  isGolden?: boolean;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  handleClick,
  children,
  loading,
  isGolden,
  ...props
}) => {
  return (
    <ThemeProvider theme={goldenBlackTheme}>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={loading}
        {...props}
      >
        {loading ? <CircularProgress size={24} /> : children}
      </Button>
    </ThemeProvider>
  );
};
