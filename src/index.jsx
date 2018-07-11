import React, {Component} from 'react'
import style from './style.scss'
export default class InputPassword extends Component {
  // static propTypes = {
  //   onBack: React.PropTypes.func.isRequired,
  //   onSubmit: React.PropTypes.func.isRequired,
  //   title: React.PropTypes.string
  // }
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      password: ['', '', '', '', '', '']
    }
  }

  componentDidMount () {
    // this.refs.input0.focus()
  }
  
  handleChange (index, e) {
    let {current, password} = this.state
    password = [...password]
    let val = e.target.value
    if (val === '' || !/[0-9]/.test(val)) {
      // this.refs[`input${current}`].input.value === ''
      return
    }
    password[index] = val
    if (current === 5) {
      this.refs[`input${current}`].blur()
      this.setState({password})
      this.props.onSubmit(password.join(''))
      return false
    }
    current++
    this.refs[`input${current}`].focus()
    this.setState({current, password})
  }
  handleListenDelete (index, e) {
    let {current, password} = this.state
    password = [...password]
    if (e.keyCode !== 8 || current === 0) {
      return
    }
    current--
    password[index - 1] = ''
    this.refs[`input${current}`].focus()
    this.setState({current, password})
  }
  render () {
    const { password } = this.state
    const { title, onBack, onGetPassword } = this.props
    return (
      <div className={style.mask}>
        <div className={style.bankWrap}>
          <div className={style.choose}>
            <i className='iconfont icon-arrow-left' onClick={onBack} />
            <div className={style.tit} flex={1} align='center'>
              {title}
            </div>
          </div>
        </div>
        <div className={style.pwdWrap}>
          <div width={`${5.04}rem`} className={style.pwdWrapOut}>
            <div className={style.inputWrap}>
              {password.map((pwd, index) => (
                <input
                  type='tel'
                  value={password[index]}
                  // ref={`input${index}`}
                  onChange={this.handleChange.bind(this, index)}
                  onKeyDown={this.handleListenDelete.bind(this, index)}
                  className={style.disc}
                />
              ))}
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
