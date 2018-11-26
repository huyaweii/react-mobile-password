import React, {Component} from 'react'
import PropTypes from 'prop-types';

import style from './style.scss'
import leftArrow from './images/left-arrow.png'
export default class InputPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: ['', '', '', '', '', '']
    }
  }
  static defaultProps() {
    return {
      height: '280px'
    }
  }

  componentDidMount () {
    this.inputPwd.focus()
  }
  
  handleChange (e) {
    let {password} = this.state
    password = [...password]
    let val = e.target.value
    if (val === '' || !/[0-9]/.test(val)) {
      return
    }
    const index = val.length - 1
    password[index] = val.slice(-1)
    if (e.target.value.length === 6) {
      this.setState({password})
      this.props.onSubmit(password.join(''))
      return false
    }
    this.setState({password})
  }
  handleListenDelete (e) {
    let {password} = this.state
    password = [...password]
    if (e.keyCode !== 8) {
      return
    }
    const index = e.target.value.length - 1
    password[index] = ''
    this.setState({ password })
  }
  handleFocusCurrent (e) {
    this.inputPwd.focus()
    e.stopPropagation()
  }
  render () {
    const { password } = this.state
    const { title, onBack, onGetPassword, height } = this.props
    return (
      <div className={style.mask}>
        <div className={style.bankWrap} style={{height}}>
          <div className={style.choose} style={{bottom: height}}>
            <img src={leftArrow} onClick={onBack} className={style.leftArrow} />
            <div className={style.tit} flex={1} align='center'>
              {title}
            </div>
          </div>
        </div>
        <div className={style.pwdWrap} style={{height}}>
          <div width='504px' className={style.pwdWrapOut}>
            <div className={style.inputWrap}>
              {password.map((pwd, index) => (
                <div className={style.disc}>
                  {password[index]}
                </div>
              ))}
              <input
                ref={el => this['inputPwd'] = el}
                type='tel'
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleListenDelete.bind(this)}
                className={style.inputPwd}
              />
              <div className={style.pwdMask} onClick={this.handleFocusCurrent.bind(this)}/>
            </div>
            <div className={style.forget} onClick={onGetPassword}>
              忘记密码?
            </div>
          </div>
        </div>
      </div>
    )
  }
}
InputPassword.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGetPassword: PropTypes.func.isRequired
}