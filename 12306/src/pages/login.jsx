import React from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import NavBar from '../components/Navbar'
import Alert from '../components/logindialog'
import history from '../components/history'
import { loginin } from '../actions'

/*
*登陆页面
*
*/

const style = {
  margin: '5%',
  width: '40%'
}
class login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      password: '',
      alerttext: '',
      open: false,
      loginlabel: '登陆',
      signinlabel: '注册'
    }
  }
    /*登陆时调用函数*/
  fetchlogin = async() => {
    try {
      console.log(this.state.user)
      this.setState({
        loginlabel: '登陆中...'
      })
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({username:this.state.user, password:this.state.password}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/post', myInit)

      // 等待 parse json
      let data = await res.json()
      let loginmessage = data.message
      if(loginmessage === 1) {
        console.log("success")
        this.props.dispatch(loginin(this.state.user))
        history.goBack()
       }
       else {
         console.log("error")
         this.setState({
           alerttext: '账号或密码错误',
           open: true,
           user: '',
           password: ''
         })
       }
    }
    catch(e) {
      console.log(e)
    }
  }
  /*注册时调用函数*/
  fetchsignin = async() => {
    try {
      console.log(this.state.user)
      this.setState({
        signinlabel: '注册中...'
      })
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({id:this.state.user, password:this.state.password}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/signin', myInit)

      // 等待 parse json
      let data = await res.json()
      let signinmessage = data.message
      if(signinmessage === 1) {
        console.log("success")
        this.props.dispatch(loginin(this.state.user))
        history.goBack()
       }
       else {
         console.log("error")
         this.setState({
           alerttext: '注册失败!该用户已注册',
           open: true,
           user: '',
           password: ''
         })
       }
    }
    catch(e) {
      console.log(e)
    }
  }
  /*账号输入框变化时触发*/
  handleChange = (event) => {
      this.setState({
        user: event.target.value,
      })
  }
  /*密码输入框变化时触发*/
  handlepasswordChange = (event) => {
      this.setState({
        password: event.target.value,
      })
  }
  /*对输入框内容进行验证*/
  test = (func) => {
    let pattern = /^[1]{1}[0-9]{10}$/
    if(pattern.test(this.state.user)) {
      if(this.state.password === '') {
        this.setState({
          alerttext: '请输入密码',
          open: true
        })
      }
      else {
        func()
      }
    }
    else {
      this.setState({
        alerttext: '请输入正确的手机号码',
        open: true,
        user: '',
        password: ''
      })
    }
  }
  /*登陆时触发事件*/
  loginin = (e) => {
    this.test(this.fetchlogin)
  }
  /*注册时触发事件*/
  signin = (e) => {
    this.test(this.fetchsignin)
  }
  /*弹出框关闭*/
  handleClose = () => {
    this.setState({
      open: false,
      loginlabel: '登陆',
      signinlabel: '注册'
    })
  }
  render(props) {
    return (
      <div>
        <NavBar title="用户登录" />
        <MuiThemeProvider>
        <div>
        <TextField
          hintText="手机号"
          floatingLabelText="请输入账号"
          fullWidth={true}
          value={this.state.user}
          onChange={this.handleChange}
        />
        <TextField
          hintText="密码"
          type="password"
          floatingLabelText="请输入密码"
          fullWidth={true}
          value={this.state.password}
          onChange={this.handlepasswordChange}
        />
        <Checkbox
          label="记住密码"
          style={{float: 'left', width: '40%', marginLeft: '5%', marginTop: '1rem'}}
        />
        <Checkbox
          label="自动登录"
          style={{float: 'left', width: '40%', marginTop: '1rem'}}
        />
        <RaisedButton label={this.state.signinlabel} primary={true} style={style} onClick={this.signin}/>
        <RaisedButton label={this.state.loginlabel} primary={true} style={style} onClick={this.loginin}/>
        <Alert handleClose={this.handleClose} open={this.state.open} text={this.state.alerttext}/>
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default connect()(login)
