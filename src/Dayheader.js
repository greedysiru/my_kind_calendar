import React from 'react';


// 클래스형 컴포넌트
class Dayheader extends React.Component {
  constructor(props){
    super(props);
    // App 컴포넌트의 state 정의
    this.state = {
      daysArray : this.props.daysArray
    };
  }
  // Day header 출력을 위한 map 함수
  
  mapDaysArray = (daysArray) => {
    // day와 idx로 mapping
    return daysArray.map((day, idx) => {
      // className을 만드는 함수
      const className = () => {
        // 공통 className
        let className = "day-col";
        // idx가 0이면 일요일
        if (idx === 0){
          return className + " sun"
        // idx가 6이면 토요일
        } else if (idx === 6){
          return className + " sat"
        // 나머지는 주중
        } else {
          return className + " weekday"
        }
      }
      return (
        // className은 함수에 의해 생성, key는 요일
        <div className={className()} key={day}>
          {/* 해당하는 요일 표시 */}
          {day}
        </div>
      )
    })
  }


  // 렌더 함수 안에 리액트 앨리먼트 넣기
  render() {
    return(
      <div className="days-header">
        {this.mapDaysArray(this.state.daysArray)}
      </div>
    );
  }
}

export default Dayheader;