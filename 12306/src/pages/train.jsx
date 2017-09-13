import React, {Component} from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import NavBar from '../components/Navbar'
import Alert from '../components/dialog'
import Refresh from '../components/refresh'
import Tooltip from '../components/tooltip'
import history from '../components/history'
import {List, ListItem} from 'material-ui/List'

/*
*车次信息页面
*
*/

const noIcon = <FontIcon></FontIcon>
const carIcon = <FontIcon><i className="material-icons" style={{color: '#EC7063'}}>train</i></FontIcon>

class train extends Component {
  state = {
    selectedIndex: 0,
    filter: 'all',
    index: '0',
    open: false,
    list: [],
    state: 'loading',
    display: 'block',
    tooltip: false,
    tipmessage: ''
  }
  componentDidMount() {
    this.fetchGank()
  }
  fetchGank = async() => {
    try {
      this.setState({
        state: 'loading',
        display: 'block'
      })
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({start:this.props.startsite, end:this.props.endsite}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/train', myInit)

      // 等待 parse json
      let data = await res.json()
      let list = data
      this.setState({
        state: 'hide',
        display: 'none'
      })
      if(list.length > 0) {
        console.log("success")
       }
       else {
         console.log("none")
       }
       this.setState({
         list: list
       })
    }
    catch(e) {
      console.log(e)
    }
  }
  fetchinsert = async(i, n, t, m, y) => {
    try {
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({id:i, number:n, title:t, time:m, type:y}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/insertrecord', myInit)

      // 等待 parse json
      let data = await res.json()
      console.log(data.message)
      if(data.message === 1) {
        this.setState({
          tooltip: true,
          tipmessage: '购买成功'
        })
      }
      else{
        this.setState({
          tooltip: true,
          tipmessage: '购买失败'
        })
      }
    }
    catch(e) {
      console.log(e)
    }

  }
  handleClose = () => {
    this.setState({open: false})
  }

  confirm = () => {
    if(this.props.login === '未登录') {
      history.push('/login')
    }
    else {
      let temp = this.change(this.state.list, this.state.filter)
      let m = temp[this.state.index]
      this.fetchinsert(this.props.login, m.number, m.title, m.time, m.type)
      this.handleClose()
    }
  }
  select = (index) => this.setState({
    selectedIndex: index,
    tooltip: false,
    tipmessage: ''
  })

  change = (list, filter) => {
    switch (filter) {
      case 'all':
        return list
      case 'D':
        return list.filter(list => list.type==='G'||list.type==='D')
      case 'P':
        return list.filter(list => list.type==='T'||list.type==='K')
      default:
        return list
    }
  }
  handleClick(index) {
    this.setState({
      index: index,
      open: true,
      tooltip: false,
      tipmessage: ''
    })
  }
  handleRequestClose = () => {
    this.setState({
      tooltip: false
    })
  }
  render() {

    return (
    <MuiThemeProvider>
    <div>
      <NavBar title={this.props.startsite+'-'+this.props.endsite} />
      <Paper zDepth={1} style={{background: '#fff'}}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="全部列车"
            icon={noIcon}
            onClick={() => {
              this.select(0)
              this.setState({
                filter: 'all'
              })
            }}
          />
          <BottomNavigationItem
            label="高铁动车"
            icon={noIcon}
            onClick={() => {
              this.select(1)
              this.setState({
                filter: 'D'
              })
            }}
          />
          <BottomNavigationItem
            label="普通列车"
            icon={noIcon}
            onClick={() => {
              this.select(2)
              this.setState({
                filter: 'P'
              })
            }}
          />
        </BottomNavigation>
      </Paper>
      <Refresh state={this.state.state} display={this.state.display}/>
      <List style={{marginBottom: '1rem'}}>
        {this.change(this.state.list, this.state.filter).map((site, index) =>
          <ListItem primaryText={site.number}
                    key={index}
                    secondaryText={
                          <p>
                            <span style={{color: '#333'}}>{site.title}</span><br />
                            {site.time}
                          </p>
                        }
                        secondaryTextLines={2}
                        rightIcon={carIcon}
                        onClick={() => this.handleClick(index)}
                        />
        )}
      </List>
      <Tooltip open={this.state.tooltip} message={this.state.tipmessage} onRequestClose={this.onRequestClose} />
      <Alert handleClose={this.handleClose} confirm={this.confirm} open={this.state.open} text="确定购买该车次车票?"/>
      </div>
      </MuiThemeProvider>
    )
  }
}

function select(state) {
  return {
    startsite: state.startsite,
    endsite: state.endsite,
    login: state.login
  }
}
export default connect(select)(train)
