import React from 'react';
import { Alert } from 'antd';

const ErrorRequestData = () => {
  return (
    <Alert
      message="Технические шоколадки"
      description="Произошла сетевая ошибка. Пожалуйста, проверьте своё VPN подключение."
      type="info"
      showIcon
    />
  );
};

export default ErrorRequestData;
