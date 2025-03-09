import { FC } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

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
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};
