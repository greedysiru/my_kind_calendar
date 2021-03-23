import React from 'react';

// histroy
import {withRouter} from 'react-router';

// 리덕스 스토어 연결
import { connect } from 'react-redux';
// 액션 생성 함수 가져오기
import {loadSchedule, createSchedule} from './redux/modules/schedule';

// Date picker
import DateTimePickers from './DateTimePickers';


// meterial-ui
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

// Radio
const GreenRadio = withStyles({
  root: {
    
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-button-demo"
        color="default"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
      />
      <GreenRadio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        value="c"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'C' }}
      />
    </div>
  );
}

// 스토어가 가진 상태값을 props로
const mapStateTopProps = (state) => ({
  plan: state.schedule.plan,
});

// 액션 생성 함수를 props로
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadSchedule());
  },
  create: (new_item) => {
    dispatch(createSchedule(new_item));
  }
}); 


class Schedule extends React.Component {
  constructor(props) {
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {
    };
    // 텍스트 입력값 가져오기
    this.text = React.createRef();
  }

  // 스케쥴 추가 함수
  addSchedulePlan = () => {
    const new_text = this.text.current.value;
    console.log(new_text);
    this.props.create(new_text);
  }
  // 렌더링 props
  componentDidMount(){
    // console.log(this.props.plan);
  }

  // 리렌더링 props
  componentDidUpdate(prevProps, prevState){
    console.log(prevProps.plan);
    console.log('리렌더링 후');
    console.log(prevState.plan);
}

  render(){
  return (
    <div className="Schedule">
      <DateTimePickers/>
      <TextField
          // 입력값 참조
          inputRef={this.text}
          type="text"
          required
          id="outlined-required"
          label=""
          placeholder="일정 입력"
          variant="outlined"
        />
        <RadioButtons/>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
         onClick={()=>{
          this.props.history.goBack();
        }}>
          뒤로가기
        </Button>
        <Button
        onClick={this.addSchedulePlan}
        >
          추가하기
        </Button>
      </ButtonGroup>
    </div>
  );
}
};


export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Schedule));