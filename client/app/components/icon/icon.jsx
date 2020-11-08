import React from 'react';
import classnames from 'classnames/bind';
import * as icons from './svg';
import styles from './icon.scss';

const cx = classnames.bind(styles);

const Icon = (props) => {
  const { icon, theme } = props;
  const glyph = icons[icon];

  return (
    <i
      className={cx('icon', {
        [`icon--theme-${theme}`]: theme,
      })}
      dangerouslySetInnerHTML={{ __html: glyph }}
    />
  );
};

export default Icon;
