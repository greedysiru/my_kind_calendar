import React from 'react';

// moment 라이브러리
import moment from 'moment';

// 달력 구성 컴포넌트
import Header from './Header';
import Calendar from './Calendar';

// test용 css
import './test.css';

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
      <div className="container">
        {/* Header에 props로 오늘 연, 월, 일 전달 */}
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
      </div>
    </div>
    );
  }
}

export default App;