import React from 'react';

// histroy
import {withRouter} from 'react-router';

// 라우터
import { Route } from 'react-router-dom'

// Datepicker
import Picker from './Picker';

// meterial-ui
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';


class Schedule extends React.Component {
  constructor(props) {
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {
    };
    // 입력값 가져오기
    this.text = React.createRef();
  }



  render(){
  return (
    <div className="Schedule">
      <Picker/>
      <TextField
          // 입력값 참조
          ref={this.text}
          required
          id="outlined-required"
          label=""
          defaultValue="일정 이름 입력"
          variant="outlined"
        />
        
        <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
         onClick={()=>{
          this.props.history.goBack();
        }}>
          뒤로가기
        </Button>
        <Button>
          추가하기
        </Button>
      </ButtonGroup>
    </div>
  );
}
};


export default withRouter(Schedule);