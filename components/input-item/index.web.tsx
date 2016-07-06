import React, { PropTypes } from 'react';
import classNames from 'classnames';
function noop() { }

export default class InputItem extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    prefixListCls: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.oneOf(['hasLine']),
    format: PropTypes.oneOf(['text', 'bankCard', 'phone', 'password', 'number']),
    editable: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    clear: PropTypes.bool,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    onExtraClick: PropTypes.func,
    error: PropTypes.bool,
    onErrorClick: PropTypes.func,
    size: PropTypes.oneOf(['large', 'small']),
    labelNumber: PropTypes.number,
    labelPosition: PropTypes.oneOf(['left', 'top']),
    textAlign: PropTypes.oneOf(['left', 'center']),
  };

  static defaultProps = {
    prefixCls: 'am-input',
    prefixListCls: 'am-list',
    type: 'hasLine',
    format: 'text',
    editable: true,
    name: '',
    value: '',
    placeholder: '',
    clear: false,
    maxLength: -1,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    extra: '',
    onExtraClick: noop,
    error: false,
    onErrorClick: noop,
    size: 'large',
    labelNumber: 4,
    labelPosition: 'left',
    textAlign: 'left',
  };

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    };
  }

  onInputChange = (e) => {
    let value = e.target.value;
    const { maxLength, onChange, format } = this.props;


    switch (format) {
      case 'text': {
        if (maxLength > 0) {
          value = value.substring(0, maxLength);
        }
        break;
      }
      case 'bankCard': {
        value = value.replace(/\D/g, '');
        if (maxLength > 0) {
          value = value.substring(0, maxLength);
        }
        value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
        break;
      }
      case 'phone': {
        value = value.replace(/\D/g, '');
        if (maxLength > 0) {
          value = value.substring(0, 11);
        }
        const valueLen = value.length;
        if (valueLen > 3 && valueLen < 8) {
          value = `${value.substr(0, 3)} ${value.substr(3)}`;
        } else if (valueLen >= 8) {
          value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
        }
        break;
      }
      case 'number': {
        value = value.replace(/\D/g, '');
        break;
      }
      case 'password': {
        break;
      }
      default: {
        break;
      }
    }
    onChange(value);
  };

  onInputBlur = (e) => {
    setTimeout(() => {
      this.setState({
        focus: false
      });
    }, 300);
    const value = e.target.value;
    this.props.onBlur(value);
  };

  onInputFocus = (e) => {
    this.setState({
      focus: true
    });
    const value = e.target.value;
    this.props.onFocus(value);
  };

  onExtraClick = (e) => {
    this.props.onExtraClick(e);
  };

  onErrorClick = () => {
    this.props.onErrorClick();
  };

  clearInput = () => {
    this.props.onChange('');
  };

  render() {
    const { prefixCls, prefixListCls, format, type, name, editable, value, placeholder, style, clear, children, error, className, extra, labelNumber } = this.props;
    const { focus } = this.state;
    const wrapCls = classNames({
      [`${prefixListCls}-item`]: type === 'hasLine',
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-focus`]: focus,
      [className]: className
    });

    const labelCls = classNames({
      [`${prefixCls}-label`]: true,
      [`${prefixCls}-label-2`]: labelNumber === 2,
      [`${prefixCls}-label-3`]: labelNumber === 3,
      [`${prefixCls}-label-4`]: labelNumber === 4,
      [`${prefixCls}-label-5`]: labelNumber === 5,
      [`${prefixCls}-label-6`]: labelNumber === 6,
      [`${prefixCls}-label-7`]: labelNumber === 7,
    });

    let inputType = 'text';
    if (format === 'bankCard' || format === 'phone') {
      inputType = 'tel';
    } else if (format === 'password') {
      inputType = 'password';
    }

    return (
      <div className={wrapCls} style={style}>
        {children ? (<div className={labelCls}>{children}</div>) : null}
        <div className={`${prefixCls}-control`}>
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            onFocus={this.onInputFocus}
            readOnly={!editable}
            pattern={format === 'number' ? '[0-9]*' : ''}
          />
        </div>
        {clear && editable && value.length > 0 ?
          <div className={`${prefixCls}-clear`} onClick={this.clearInput} onTouchStart={this.clearInput} />
          : null}
        {error ? (<div className={`${prefixCls}-error-extra`} onClick={this.onErrorClick} />) : null}
        {extra !== '' ? <div className={`${prefixCls}-extra`} onClick={this.onExtraClick}>{extra}</div> : null}
      </div>
    );
  }
}