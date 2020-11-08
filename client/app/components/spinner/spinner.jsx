import React from 'react';
import classnames from 'classnames/bind';
import styles from './spinner.scss';

const cx = classnames.bind(styles);

const Spinner = (props) => {
  const { theme, display, numbers } = props;

  return (
    <div className={cx('spinner-container', {
      [`spiner-container--display-${display}`]: display,
    })}
    >
      <div
        className={cx('spinner', {
          [`spinner--${theme}`]: theme,
          [`spinner-${numbers[0]}`]: numbers,
        })}
      />
      <div
        className={cx('spinner', {
          [`spinner--${theme}`]: theme,
          [`spinner-${numbers[1]}`]: numbers,
        })}
      />
      <div
        className={cx('spinner', {
          [`spinner--${theme}`]: theme,
          [`spinner-${numbers[2]}`]: numbers,
        })}
      />
    </div>
  );
};

export default Spinner;
