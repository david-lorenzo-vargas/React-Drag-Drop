import React from 'react';
import Text from '../text';
import { Row, Column } from '../grid';

import styles from './drop-box.scss';

const DropBox = (props) => {
  const { onChange } = props;

  const handleOnChange = (event) => {
    onChange(event);
  };

  return (
    <div className={styles['drop-box']}>
      <Row direction="row" center>
        <Column>
          <Text
            text="Drag files here or"
            color="grey"
            size="small"
            bold="bold"
          />
        </Column>
        <Column>
          <label className={styles['drop-box__label']} htmlFor="choose-files">
            <input
              id="choose-files"
              type="file"
              name="choose-files"
              className={styles['input']}
              onChange={handleOnChange}
              multiple
            />
            <Text
              text="browse"
              color="blue"
              size="small"
              bold="bold"
              margin="left"
              cursor="pointer"
            />
          </label>
        </Column>

      </Row>
    </div>
  );
};

export default DropBox;
