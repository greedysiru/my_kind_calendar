// 리액트 패키지 불러오기
import React from 'react';

// 함수형 컴포넌트
// props: 부모 컴포넌트에게 받아온 데이터
const FirstScreen = (props) => {
  // 컴포넌트가 보여줄 ui 요소(react element)
  return (
  	<div className ="FirstScreen">
    	시작 페이지
      
    </div>
  );
}

// 만든 컴포넌트를 사용하기 위해서 export
// 다른 컴포넌트에서 import하여 해당 컴포넌트를 사용할 수 있다.
export default FirstScreen;