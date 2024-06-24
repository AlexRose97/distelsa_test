import { useCallback } from 'react';
import { useSnackbar } from 'notistack'

interface SnackbarOptions {
    message: string;
    duration?: number;
}

const useCustomAlert = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showAlert = useCallback((options: SnackbarOptions, severity: 'success' | 'info' | 'warning' | 'error') => {
        enqueueSnackbar(options.message, { variant: severity, autoHideDuration: options.duration || 6000 })
    }, []);

    const successAlert = useCallback((options: SnackbarOptions) => {
        showAlert(options, 'success');
    }, [showAlert]);

    const infoAlert = useCallback((options: SnackbarOptions) => {
        showAlert(options, 'info');
    }, [showAlert]);

    const warningAlert = useCallback((options: SnackbarOptions) => {
        showAlert(options, 'warning');
    }, [showAlert]);

    const errorAlert = useCallback((options: SnackbarOptions) => {
        showAlert(options, 'error');
    }, [showAlert]);

    return {
        successAlert,
        infoAlert,
        warningAlert,
        errorAlert,
    };
};

export default useCustomAlert;
