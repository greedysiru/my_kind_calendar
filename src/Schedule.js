import React from 'react';

// histroy
import {withRouter} from 'react-router';

// 리덕스 스토어 연결
import { connect } from 'react-redux';
// 액션 생성 함수 가져오기
import {createScheduleFB} from './redux/modules/schedule';



// material-ui
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import { ContactlessOutlined } from '@material-ui/icons';


// DateTimePickers
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

// 바뀐 데이터 값을 받을 전역변수들
let dateTime = "";
let radioSelected = "a";

export function DateTimePickers(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        onChange={(event)=>{
          dateTime = event.target.value
        }}
        defaultValue=""
        id="datetime-local"
        label="일정"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

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
    radioSelected = event.target.value;
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
  
  create: (new_item) => {
    dispatch(createScheduleFB(new_item));
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
    const new_dateTime = dateTime;
    const new_radioSelected = radioSelected;
    // 날짜, 시간 필수 입력 경고창
    if (new_text =="" || new_dateTime == ""){
      window.alert('날짜와 시간을 전부 입력해주십시오.')
    } else{
    // 문자열 자르기
    let split_dateTime = new_dateTime.split('T');
    // 실제 시간 저장
    const realTime = split_dateTime[1];
    // 시간 : 제거 후 정수형 변환
    split_dateTime[1] = parseInt(split_dateTime[1].replace(':', ''));
    // 딕셔너리로 변환
    const new_plan ={date: split_dateTime[0], 
                    time: split_dateTime[1],
                    realTime: realTime, 
                    completed: false, 
                    text: new_text, 
                    color: new_radioSelected}
    // 스토어에 저장
    this.props.create(new_plan);
    // 뒤로가기
    this.props.history.goBack();}
  }
  // 렌더링
  componentDidMount(){
    dateTime = ""
  }

  // 리렌더링
  componentDidUpdate(prevProps, prevState){
}

  render(){
  return (
    <div className="Schedule">
      <div className="Schedule-contents">
        <span className = "imo">🤔</span>
      <DateTimePickers/>
      <div className ="input-text">
      <TextField
          // 입력값 참조
          inputRef={this.text}
          type="text"
          required
          id="outlined-required"
          label=""
          placeholder="상세"
          variant="outlined"
        />
        </div>
        <div className="Radio">
        <RadioButtons/>
        </div>
        <ButtonGroup  variant="contained" aria-label="contained primary button group">
        <Button color= "secondary"
         onClick={()=>{
          this.props.history.goBack();
        }}
        style={{ fontSize: "1em" }}
        >
          뒤로가기
        </Button>
        <Button color= "primary"
        onClick={this.addSchedulePlan}
        style={{ fontSize: "1em" }}
        >
          추가하기
        </Button>
      </ButtonGroup>

      </div>
    </div>
  );
}
};


export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(Schedule));