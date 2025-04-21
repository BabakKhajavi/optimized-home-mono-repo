import { FC } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type PrimaryButtonProps = ButtonProps & {
  handleClick?: () => void;
  loading?: boolean;
  isContrast?: boolean;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  handleClick,
  children,
  loading,
  isContrast,
  ...props
}) => {
  return (
    <Button
      variant={isContrast ? 'contrast' : 'contained'}
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};
