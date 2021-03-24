import React from 'react';

// 리덕스
import {connect} from 'react-redux';

// 리덕스 액션 생성 함수
import {updateSchedule} from './redux/modules/schedule';

// material-ui
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// 스토어가 가진 상태값을 props로
const mapStateTopProps = (state) => ({
  plan: state.schedule.plan,
});

// 액션 생성 함수를 props로
const mapDispatchToProps = (dispatch) => ({
  
  update: (update_item) => {
    dispatch(updateSchedule(update_item));
  }
}); 

// 클래스형 컴포넌트
class Modal extends React.Component {
  constructor(props){
    super(props);
    // Modal 컴포넌트의 state 정의
    this.state = {
      
    };
  }
  
  // completed 업데이트 함수
  updateCompleted = () => {
    const update_item = {
      text: this.props.planText,
      date: this.props.planDate,
    }
    console.log(this.props)
    console.log(update_item)
    this.props.update(update_item);
    console.log(this.props.planCompleted)
    console.log("실행")
    this.props.turnOffModal()
  }
  
  // 렌더 함수 안에 리액트 앨리먼트 넣기
  render() {
    return(
    <div className="Modal">
      <h1>{this.props.planText}</h1>
      <h2>{this.props.planDate}</h2>
      <h3>{this.props.planCompleted === "true" ? '완료' : '미완료'}</h3>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
         onClick= {this.props.turnOffModal}
        >
          닫기
        </Button>
        <Button
         
        >
          삭제
        </Button>
        <Button
          onClick={this.updateCompleted}
        >
          완료
        </Button>
      </ButtonGroup>
    </div>
    );
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Modal);