import React from 'react';
import classnames from 'classnames/bind';
import styles from './text.scss';

const cx = classnames.bind(styles);

const Text = (props) => {
  const {
    text,
    size,
    color,
    bold,
    margin,
    cursor,
  } = props;

  return (
    <div>
      <span
        className={cx('text', {
          [`text--${size}`]: size,
          [`text--color-${color}`]: color,
          [`text--${bold}`]: bold,
          [`text--margin-${margin}`]: margin,
          [`text--cursor-${cursor}`]: cursor,
        })}
      >
        {text}
      </span>
    </div>
  );
};

export default Text;
