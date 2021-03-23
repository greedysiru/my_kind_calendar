import React from 'react';

// Route 라이브러리
import { Route, Switch } from 'react-router-dom'
import {withRouter} from 'react-router';

// moment 라이브러리
import moment from 'moment';

// 달력 구성 컴포넌트
import Header from './Header';
import Calendar from './Calendar';

// 스케쥴 컴포넌트
import Schedule from './Schedule';

//  시작 스크린
import FirstScreen from './FirstScreen';

// Not Found
import NotFound from './NotFound'

// test용 css
import './test.css';

// meterial UI
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

// 클래스형 컴포넌트
class App extends React.Component {
  constructor(props){
    super(props);
    // App 컴포넌트의 state 정의
    this.state = {
      // 오늘 년, 월, 일 가져오기
      yearAndMonth: moment(),
      today : moment(),
      // days 배열
      daysArray: ["일", "월", "화", "수", "목", "금", "토"],
      // 선택된 날, 날짜는 YYYY-MM-DD 형식으로 표시
      selected: moment().format("YYYY-MM-DD")
    }
  }
  
  static defaultProps = {
    clickFn: () => {}
  }
  
  // month 이동 버튼 함수
  moveMonth = (month) => {
    this.setState({
      // add 메소드
      // 1번째 인자로 이동할 숫자를 받고 2번째 인자로 월을 받기
      yearAndMonth : this.state.yearAndMonth.add(month, 'M')
    })
  }
  
  // 이번 달이 아닌 일자를 클릭하면 해당 달의 정보로 yearAndMonth를 변경하는 함수
  changeSeleted = (changedDate) => {
    if(moment(changedDate).isSame(this.state.selected, 'day')){
      this.props.clickFn(changedDate);
      return;
    }

    this.setState({
      selected : changedDate
    })

    this.props.clickFn(changedDate);

    if(moment(changedDate).isBefore(this.state.yearAndMonth, 'month')){
      this.moveMonth(-1)
    }else if(moment(changedDate).isAfter(this.state.yearAndMonth, 'month')){
      this.moveMonth(1)
    }
  }

  // 렌더 함수 안에 리액트 앨리먼트 넣기
  render() {
    return(
    <div className="App">
      {/* 라우트, 스위치 적용 */}
        <Switch>
          <Route path="/" exact component={FirstScreen}/>
          <Route path="/calendar"
                render={(props) => (
                <div className="container">
                  <Header
                  // Header props
                  yearAndMonth = {this.state.yearAndMonth.format("YYYY년 MM월")}
                  today = {this.state.today.format("오늘 YYYY - MM - DD")}
                  moveMonth = {this.moveMonth}
                  />
                  <Calendar
                  // Calendar props
                  calendarYM = {this.state.yearAndMonth.format("YYYY-MM-DD")}
                  daysArray = {this.state.daysArray}
                  selected = {this.state.selected}
                  changeSeleted = {this.changeSeleted}
                  />
                  {/* 플로팅 버튼 */}
                  <Fab color="primary">
                  <EditIcon 
                  onClick={() =>
                    this.props.history.push('/schedule')
                  }/>
                  </Fab>
                </div>
                )}/>
          <Route path="/schedule"
          render={(props) => (
          <Schedule/>
          )}/>
          {/* Not Found */}
          <Route component={NotFound}/>
        </Switch>
    </div>
    );
  }
}

export default withRouter(App);