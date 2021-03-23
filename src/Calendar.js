import React from 'react';

// moment 라이브러리
import moment from 'moment';

// 달력 구성 컴포넌트
import Dayheader from "./Dayheader";

// 클래스형 컴포넌트
class Calendar extends React.Component {
  constructor(props){
    super(props);
    // App 컴포넌트의 state 정의
    this.state = {
    };
  }
  
  // 이번달에 대한 정보를 파라미터로 전달받고 이를 이용해서 1일의 시작과 요일을 알아내는 함수
  saveWeeks = (monthYear) => {
    // 모먼트 객체의 월의 첫날 정보
    const firstDateOfMonth = moment(monthYear).startOf('month');
    // 처음 날의 요일 정보
    const firstDayOfMonth = firstDateOfMonth.get('d');
    // 이전 달의 마지막 일요일의 정보
    const firstDayOfWeek = firstDateOfMonth.clone().add('d', -firstDayOfMonth);
    const weeks = [];
    const className = "week"
    for (let i = 0; i < 6; i++){
      weeks.push((
        <Week key = {`week-${i}`}
        // Week props
        // 이번달의 정보
        calendarMonthYear = {firstDateOfMonth.format("YYYY-MM")}
        // 각 주마다의 첫 날
        firstDateOfWeekformat={firstDayOfWeek.clone().add('d', i * 7).format("YYYY-MM-DD")}
        selected = {this.props.selected}
        changeSeleted= {this.props.changeSeleted}
        />
      ))
    }
    return weeks
  }
  
  // 렌더 함수 안에 리액트 앨리먼트 넣기
  render() {
    return(
    <div className="Calendar">
      <Dayheader
      // DayHeader props
      daysArray = {this.props.daysArray}
      />
      {this.saveWeeks(this.props.calendarYM)}
    </div>
    );
  }
}

// 달력의 주를 표현하는 클래스
class Week extends React.Component {
    state = {}
    // moment 객체를 array에 넣어 반환하는 함수
    saveDates = (firstDate) => {
      const dates = [];
      // 7번 반복
      for (let i = 0; i < 7; i++){
        // add 메소드로 각 날짜에 접근
        const date = moment(firstDate).add('d', i);
        // 정보를 array에 넣기
        dates.push({
          // 연월일 정보
          yearMonthDay: date.format("YYYY-MM-DD"),
          // 날짜 정보
          getday: date.format('D'),
          // 휴일
          isHolyDay: false
        });
      }
      // array를 리턴
      return dates;
    }
    // Date 컴포넌트를 만드는 함수
    mapDates = (Dates, calendarMonthYear, seletedDay, fn = () => { }) => {
      const thisMonth = moment(calendarMonthYear);
      // Dates 배열의 dateinfo와 인덱스 mapping
      return Dates.map((dateInfo, i) => {
        // 기본값
        let className = "date";
        // 이번달이 아닌 경우
        if (!thisMonth.isSame(dateInfo.yearMonthDay,'month')){
          className += " notThisMonth"
          // 일요일
        } else if (i === 0) {
          className += " sun";
          // 토요일
        } else if (i === 6) {
          className += " sat";
          // 평일
        } else {
          className += " weekday"
        }
        if(moment(dateInfo.yearMonthDay).isSame(seletedDay, 'day')){
          className += " selected"
        }

        return (
          <div 
          className={className}
          onClick={() => fn(dateInfo.yearMonthDay)}
          // key는 연월일
          key = {dateInfo.yearMonthDay}
          >
            {/* 날짜 정보 출력 */}
          <label className="date-day">
            {dateInfo.getday}
          </label>
          </div>
        )
      })
  }
  render(){
    return (
      <div className = "Week">
        {this.mapDates(this.saveDates(this.props.firstDateOfWeekformat), 
        this.props.calendarMonthYear, 
        this.props.selected,
        this.props.changeSeleted
        )}
      </div>
    )
  }

  }


export default Calendar;