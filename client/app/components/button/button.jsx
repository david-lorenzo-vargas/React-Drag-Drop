import React from 'react';
import classnames from 'classnames/bind';
import * as icons from './svg';
import styles from './button.scss';

const cx = classnames.bind(styles);

const Button = (props) => {
  const {
    id,
    icon,
    theme,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const glyph = icons[icon];

  const handleButtonClick = () => {
    onClick();
  };

  const handleMouseEnter = () => {
    onMouseEnter(id);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
  };

  return (
    <div
      className={cx('button', {
        [`button--theme-${theme}`]: theme,
      })}
      dangerouslySetInnerHTML={{ __html: glyph }}
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Button;
