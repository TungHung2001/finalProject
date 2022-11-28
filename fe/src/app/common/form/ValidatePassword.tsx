import React, {useCallback, useMemo} from 'react';
import {Icon} from 'semantic-ui-react';
import {validatePassword} from '../util/helpers';

function ValidatePassword({password = ''}) {
  const errors = useMemo<any>(() => {
    return validatePassword(password);
  }, [password]);

  const renderItem = useCallback((key = '', message = '') => {
    const isPassed = !errors[key];
    return (
      <li className={`rule-item ${isPassed ? 'pass' : ''}`}><Icon name={isPassed ? 'check' : 'close'}/> {message}</li>
    );
  }, [errors]);

  return (
    <ul className="validate-password">
      {renderItem('length', 'Password must have at least 6 characters')}
      {renderItem('lowercaseUppercase', 'Password must contain lowercase and uppercase letters')}
      {renderItem('specialCharacter', 'Password must contain special characters')}
      {renderItem('number', 'Password must contain numbers')}
    </ul>
  );
}

export default ValidatePassword;
