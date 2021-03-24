import React from 'react';

// material-ui
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
      <h1>{this.props.planText}</h1>
      <h2>{this.props.planDate}</h2>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
         onClick= {this.props.turnOffModal}
        >
          닫기
        </Button>
        <Button

        >
          완료
        </Button>
      </ButtonGroup>
    </div>
    );
  }
}

export default Modal;