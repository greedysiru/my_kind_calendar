import React from 'react';

// 애니메이션
import Zoom from 'react-reveal/Zoom';

// Route 라이브러리
import { Route } from 'react-router-dom'
import {withRouter} from 'react-router';

// material-ui
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';

// image
import img from './calendar.png';

// 함수형 컴포넌트
// props: 부모 컴포넌트에게 받아온 데이터
const FirstScreen = (props) => {
  // 컴포넌트가 보여줄 ui 요소(react element)
  return (
    <Zoom>
  	<div className ="FirstScreen Screen">
      <img className ="calimg" src={img}
      onClick={() => {
        props.history.push('/calendar');
        }}
      ></img>
      <div className="myblog">
      <a href="https://github.com/greedysiru/react_calendar" target="_blank">
      <GitHubIcon style={{ fontSize: "2em" }}
      color="primary"
      />
      </a>
      <a href="https://greedysiru.tistory.com" target="_blank">
      <HomeIcon style={{ fontSize: "2em" }}
      color="primary"
      />
      </a>
      </div>
    </div>
    </Zoom>
  );
}

export default withRouter(FirstScreen);