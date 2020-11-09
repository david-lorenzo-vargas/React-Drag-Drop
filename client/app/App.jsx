import React from 'react';
import { Row, Column } from './components/grid';
import Icon from './components/icon';
import Text from './components/text';
import Button from './components/button';
import DropBox from './components/drop-box';
import Spinner from './components/spinner';
import styles from './reset.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      selectedIndex: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  getIconType(type) {
    const wordExtension = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const excelExtension = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    let iconType;

    if (type === 'application/pdf') {
      iconType = 'pdf';
    }

    if (type === 'image/jpeg') {
      iconType = 'jpeg';
    }

    if (type === excelExtension) {
      iconType = 'excel';
    }

    if (type === wordExtension) {
      iconType = 'word';
    }

    return iconType;
  }

  getSupportedFileStatus(item) {
    const { type } = item;
    const wordExtension = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const excelExtension = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    return !!(type === 'application/pdf' || type === excelExtension || type === 'image/jpeg' || type === wordExtension);
  }

  getButtonType(file, index) {
    const { selectedIndex } = this.state;
    const fileReady = file.done &&
      file.supportedFile &&
      file.base64;

    let buttonType;

    if (selectedIndex !== index && fileReady) {
      buttonType = 'ready';
    }

    if ((selectedIndex === index && fileReady) ||
        (selectedIndex === index && !fileReady) ||
        (selectedIndex !== index && !fileReady)) {
      buttonType = 'remove';
    }

    return buttonType;
  }

  extendFilesWithBase64(files) {
    const newFiles = [...files];

    newFiles.forEach(file => {
      const reader = new FileReader();

      reader.readAsDataURL(file.data);

      reader.onload = () => {
        const newFileObj = {
          ...file,
          base64: reader.result.split(',')[1],
          done: true,
        };

        const foundFileIndex = files.findIndex((item) => item.id === newFileObj.id);

        newFiles[foundFileIndex] = newFileObj;

        this.setState({
          files: newFiles,
        });
      };

      reader.onerror = () => {
        console.log('Error: ', error);
      };
    });
  }

  handleOnChange(event) {
    const { files } = this.state;

    const filesArray = Object.values(event.target.files)
      .map((item, index) => ({
        id: files.length + index,
        done: false,
        supportedFile: this.getSupportedFileStatus(item),
        base64: undefined,
        data: item,
      }));

    const newFiles = [files, filesArray].flat();
    const delay = Math.floor(Math.random() * 7000) + 1;

    this.setState({
      files: newFiles,
    });

    window.setTimeout(() => {
      this.extendFilesWithBase64(newFiles);
    }, delay);
  }

  handleButtonClick() {
    const { selectedIndex, files } = this.state;
    const newFilesArray = [...files];
    newFilesArray.splice(selectedIndex, 1);

    this.setState({
      files: newFilesArray,
    });
  }

  handleMouseEnter(id) {
    this.setState({
      selectedIndex: id,
    });
  }

  handleMouseLeave() {
    this.setState({
      selectedIndex: '',
    });
  }

  render() {
    const { files } = this.state;

    return (
      <div className={styles['drop-drag']}>

        <div className={styles['drop-drag__header']}>
          <Text text="Upload" size="medium" color="blue" bold="bold" />
        </div>

        <div className={styles['drop-drag__body']}>
          {files.map((file, index) => {
            const { name, type } = file.data;
            const { supportedFile, base64, done } = file;
            const loading = supportedFile && !base64;
            const iconType = this.getIconType(type);
            const buttonType = this.getButtonType(file, index);

            return (
              <Row direction="row" key={file.id}>
                <Column shrink>
                  <Icon icon={supportedFile ? iconType : 'failure'} theme={supportedFile ? iconType : 'failure'} />
                </Column>

                <Column grow>
                  <Text text={name} color={done ? 'blue' : 'grey'} bold={done} />

                  {supportedFile ? '' : 'sorry, this extension is not supported'}

                  {loading ? (
                    <Spinner
                      theme={iconType}
                      numbers={['one', 'two', 'three']}
                      display={done ? 'none' : 'block'}
                    />
                  ) : ''}

                </Column>

                <Column shrink>
                  <Button
                    id={index}
                    icon={buttonType === 'remove' ? 'cancel' : 'done'}
                    theme={buttonType === 'remove' ? 'red' : 'green'}
                    onClick={this.handleButtonClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                  />
                </Column>
              </Row>
            );
          })}
        </div>

        <div>
          <DropBox className={styles['drop-drag__footer']} onChange={this.handleOnChange} />
        </div>

      </div>

    );
  }
}

export default App;
