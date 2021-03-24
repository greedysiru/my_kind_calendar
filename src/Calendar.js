import React from 'react';

// moment 라이브러리
import moment from 'moment';

// redux
import {connect} from 'react-redux';
// 액션 생성 함수
import {loadSchedule} from './redux/modules/schedule';

// 달력 구성 컴포넌트
import Dayheader from "./Dayheader";

// 모달
import Modal from "./Modal";
import { FilterTiltShiftSharp } from '@material-ui/icons';

// 스토어가 가진 상태값을 props로
const mapStateTopProps = (state) => ({
  plan: state.schedule.plan,
});

// 액션 생성 함수를 props로
const mapDispatchToProps = (dispatch) => ({
  
  load: () => {
    dispatch(loadSchedule());
  }
}); 





// 클래스형 컴포넌트
class Calendar extends React.Component {
  constructor(props){
    super(props);
    // App 컴포넌트의 state 정의
    this.state = {
      modalStatus: false,
    // 모달에 전달할 정보들
      modalPlanText : "",
      modalPlanDate : "",
      modalPlanCompleted : false
    };
  }
  // 모달창 띄우기
   turnOnModal = (e) => {
    this.state.modalStatus = true;
    console.log("모달 켜짐")
    this.state.modalPlanText = e.target.dataset.text;
    this.state.modalPlanDate = e.target.dataset.date;
    this.state.modalPlanCompleted = e.target.dataset.completed;
    this.forceUpdate();
  }
    // 모달창 끄기
  turnOffModal = (e) => {
    this.state.modalStatus = false
    console.log("모달 꺼짐")
    this.forceUpdate();
  }


  
    componentDidMount(){

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
        // 스토어의 스케쥴
        plan = {this.props.plan}
        turnOnModal = {this.turnOnModal}
        filtering = {this.props.filtering}
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
      {this.state.modalStatus && 
            <Modal
            modalStatus = {this.state.modalStatus}
            planText = {this.state.modalPlanText}
            planDate = {this.state.modalPlanDate}
            planCompleted = {this.state.modalPlanCompleted}
            turnOffModal = {this.turnOffModal}
            />
          }
    </div>
    );
  }
}

// 달력의 주를 표현하는 클래스
class Week extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

    // moment 객체를 array에 넣어 반환하는 함수
    saveDates = (firstDate) => {
      const dates = [];
      // 스케쥴 배열, 각 요소는 딕셔너리
      let scheduleArray = this.props.plan
      // 시간 기준으로 오름차순 정렬
      const sortingField = "time";
      scheduleArray.sort(function(a, b){
        return a[sortingField] - b[sortingField];
      });
      // 7번 반복
      for (let i = 0; i < 7; i++){
        // add 메소드로 각 날짜에 접근
        const date = moment(firstDate).add('d', i);
        // 스케쥴에 있는 일자인지 검사
        const compareYMD = date.format("YYYY-MM-DD")
        // 스케쥴의 갯수
        const scheduleEA = scheduleArray.length
        // 해당 일자의 스케쥴을 저장할 배열
        const thisDaySchedule = [];
        // 스케쥴을 탐색하여 같은 일자이면 배열에 저장
        if (this.props.filtering){
        for (let i = 0; i < scheduleEA; i++){
          if (compareYMD === scheduleArray[i].date){
            thisDaySchedule.push({
                                  date: scheduleArray[i].date, 
                                  time: scheduleArray[i].time,
                                  realTime: scheduleArray[i].realTime, 
                                  completed: scheduleArray[i].completed, 
                                  text: scheduleArray[i].text, 
                                  color: scheduleArray[i].color
                          });
          }
        }} else {
          for (let i = 0; i < scheduleEA; i++){
            if (compareYMD === scheduleArray[i].date && scheduleArray[i].completed){
              thisDaySchedule.push({
                                    date: scheduleArray[i].date, 
                                    time: scheduleArray[i].time,
                                    realTime: scheduleArray[i].realTime, 
                                    completed: scheduleArray[i].completed, 
                                    text: scheduleArray[i].text, 
                                    color: scheduleArray[i].color
                            });
            }
          }
        }
        // 정보를 array에 넣기
        dates.push({
          // 연월일 정보
          yearMonthDay: compareYMD,
          // 날짜 정보
          getday: date.format('D'),
          // 휴일
          isHolyDay: false,
          // 해당일 스케쥴
          thisDaySchedule: thisDaySchedule
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
           {dateInfo.thisDaySchedule.map((plan, idx) => {
             className = "todayPlan "
             className += plan.color
             return (
               <div className = {className}
               key={idx}
               data-completed= {plan.completed}
               onClick={this.props.turnOnModal}
               data-text = {plan.text}
               data-date = {plan.date}
               >
                 {plan.text}
              </div>
             );
           })}
          <div className="toDaySchedule">
          </div>
          
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


export default connect(mapStateTopProps, mapDispatchToProps)(Calendar);