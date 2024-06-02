import * as React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function ToastMessage({ showmessage, message, variant }) {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (showmessage) {
      enqueueSnackbar(message, { variant: variant });
    }
  }, [showmessage, message, variant, enqueueSnackbar]);

  return null;
}

export default function IntegrationNotistack({ showmessage, message, variant }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={2000}
    >
      <ToastMessage showmessage={showmessage} message={message} variant={variant} />
    </SnackbarProvider>
  );
}
