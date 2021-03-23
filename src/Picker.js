import React, { useState } from 'react';

// 일자 선택 라이브러리
import DatePicker from "react-datepicker";

// 시간 관련 함수
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

// 함수형 컴포넌트
// props: 부모 컴포넌트에게 받아온 데이터
const Picker = (props) => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  }
  // 컴포넌트가 보여줄 ui 요소(react element)
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      inline
      filterTime={filterPassedTime}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
}

// 만든 컴포넌트를 사용하기 위해서 export
// 다른 컴포넌트에서 import하여 해당 컴포넌트를 사용할 수 있다.
export default Picker;