import React from 'react';

// 클래스형 컴포넌트
class Modal extends React.Component {
  constructor(props){
    super(props);
    // Modal 컴포넌트의 state 정의
    this.state = {
      
    };
  }
  
  // 렌더 함수 안에 리액트 앨리먼트 넣기
  render() {
    return(
    <div className="Modal">
      <h1>일정 내용</h1>
        {/* 컴포넌트 */}
    </div>
    );
  }
}

export default Modal;