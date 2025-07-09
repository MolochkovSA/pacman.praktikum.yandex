import { ErrorBoundary } from 'react-error-boundary';
import { useNotification } from '@/entities/notification';
import { ReactNode } from 'react';
import { ErrorPage } from '@/pages/error';

type GlobalErrorHandlerProps = {
  children: ReactNode;
};

export const GlobalErrorHandler = ({ children }: GlobalErrorHandlerProps) => {
  const { notify } = useNotification();

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorPage
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          errorType="500"
        />
      )}
      onError={(error, info) => {
        console.error('Error caught:', error, info);
        notify('Произошла критическая ошибка. Перезагрузите страницу');
      }}
      onReset={() => window.location.reload()}>
      {children}
    </ErrorBoundary>
  );
};
