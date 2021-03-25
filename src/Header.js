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
        {/* 이전 월 이동 버튼 */}
        <ArrowLeftIcon
        style={{ fontSize: "4em" }}
        onClick = {() => {this.props.moveMonth(-1)}}
        />
        <h1>{this.props.yearAndMonth}</h1>
        {/* 다음 월 이동 버튼 */}
        <ArrowRightIcon
        style={{ fontSize: "4em" }}
        onClick = {() => {this.props.moveMonth(1)}}
        />

    </div>
    );
  }
}

export default Header;