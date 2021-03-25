import React from 'react';

// 애니메이션
import Zoom from 'react-reveal/Zoom';

// 리덕스
import {connect} from 'react-redux';

// 리덕스 액션 생성 함수
import {deleteScheduleFB, updateScheduleFB, loadscheduleFB} from './redux/modules/schedule';

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
    dispatch(updateScheduleFB(update_item));
  },
  delete: (delete_item) => {
    dispatch(deleteScheduleFB(delete_item));
  },
  load: () => {
    dispatch(loadscheduleFB());
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
  
  componentDidMount(){
  }

  // completed 업데이트 함수
  updateCompleted = () => {
    const update_item = {
      text: this.props.planText,
      date: this.props.planDate,
    }
    this.props.update(update_item);
    this.props.turnOffModal()
  }

  // 삭제 함수
  deleteSchedule = () => {
    const delete_item = {
      date: this.props.planDate,
      text: this.props.planText,
    }
    this.props.delete(delete_item);
    this.props.turnOffModal();
  }
  
  // 렌더 함수 안에 리액트 앨리먼트 넣기
  render() {
    return(
      <Zoom>
    <div className="Modal">
      <h1 className ={this.props.planColor}>{this.props.planText}</h1>
      <h2>{this.props.planDate}</h2>
      <h3>{this.props.planCompleted === "true" ? '😎' : '🥺'}</h3>
      <h4>{this.props.planCompleted === "true" ? '완료했습니다!' : '완료하지 못했어요'}</h4>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button
         onClick= {this.props.turnOffModal}
        >
          닫기
        </Button>
        <Button
         onClick={this.deleteSchedule}
        >
          삭제
        </Button>
        {this.props.planCompleted === "true" ? null :(<Button
          onClick={this.updateCompleted}
        >
          완료
        </Button>)}
        </ButtonGroup>
    </div>
    </Zoom>
    );
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Modal);