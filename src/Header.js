import React from 'react';

// 아이콘 가져오기
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// 클래스형 컴포넌트
class Header extends React.Component {
  constructor(props){
    super(props);
    // App 컴포넌트의 state 정의
    this.state = {
      list: [],
    };
  }
  
  // 렌더 함수 안에 리액트 앨리먼트 넣기
  render() {
    return(
    <div className="Header">
      <div>
        {this.props.yearAndMonth}
      </div>
      <div>
        {/* 이전 월 이동 버튼 */}
        <ArrowLeftIcon
        onClick = {() => {this.props.moveMonth(-1)}}
        />
        {this.props.today}
        {/* 다음 월 이동 버튼 */}
        <ArrowRightIcon
        onClick = {() => {this.props.moveMonth(1)}}
        />
      </div>
    </div>
    );
  }
}

export default Header;