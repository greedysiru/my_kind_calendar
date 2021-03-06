import { Schedule } from '@material-ui/icons';
import {firestore} from '../../firebase';

// Actions
const LOAD = 'schedule/LOAD';
const CREATE = 'schedule/CREATE';
const UPDATE = 'schedule/UPDATE';
const DELETE = 'schedule/DELETE';

const LOADED = 'schdule/LOADED';

// 초기값
const initialState = {
  is_loaded: false,
   plan: [
    //  {date: "2021-03-25", 
    //  time: 1000,
    //  realTime: "10:00",  
    //  completed: false, 
    //  text: "과제 제출하기", 
    //  color: "a"},
    //  {date: "2021-03-25", 
    //  time: 1400, 
    //  realTime: "14:00",
    //  completed: false, 
    //  text: "외식하기", 
    //  color: "a"},
    //  {date: "2021-03-25", 
    //  time: 1600, 
    //  realTime: "16:00",
    //  completed: false, 
    //  text: "운동하기", 
    //  color: "c"},
    //  {date: "2021-04-01", 
    //  time: 1600, 
    //  realTime: "16:00",
    //  completed: false, 
    //  text: "시루 밥주기", 
    //  color: "c"}
   ]
};

// Action Creator
export const loadSchedule = (schedule) => {
  return {type: LOAD, schedule};
}

export const createSchedule = (schedule) => {
  return {type: CREATE, schedule};
}

export const updateSchedule = (schedule) => {
  return {type: UPDATE, schedule};
}

export const deleteSchedule = (schedule) => {
  return {type: DELETE, schedule};
}

export const isLoaded = (loaded) => {
  return {type: LOADED, loaded};
}

// 파이어베이스와 연동
const schedule_db = firestore.collection("calendar");
export const loadscheduleFB = () => {
  return function (dispatch) {
    schedule_db.get().then((docs) => {
      let schedule_data = [];
      docs.forEach((doc) => {
        if(doc.exists){
          schedule_data = [...schedule_data, {id: doc.id, ...doc.data()}];
        }
      });
      dispatch(loadSchedule(schedule_data));
    })
  }
}

export const createScheduleFB = (schedule) => {
  return function (dispatch) {
    let schedule_data = {...schedule};
    schedule_data = schedule_data
    schedule_db.add(schedule_data).then((docRef) => {
      schedule_data = {...schedule_data,};
      dispatch(createSchedule(schedule_data));
      dispatch(isLoaded(true));
    }).catch((err) => {
      window.alert('오류가 발생했습니다. 다시 시도해주십시오.')
    });
  };
};

export const updateScheduleFB = (schedule) => {
  return function (dispatch, getState) {
    let _schedule_data = getState().schedule.plan;
    let schedule_data = {};
    for (let i = 0; i < _schedule_data.length; i++){
      if (_schedule_data[i].text === schedule.text && _schedule_data[i].date === schedule.date){
        schedule_data = _schedule_data[i];
      }
    }
    schedule_data = {...schedule_data, completed: true};
    schedule_db.doc(schedule_data.id).update(schedule_data).then((res) => {
      dispatch(updateSchedule(schedule));
      dispatch(isLoaded(true));
    }).catch((err) => {
      console.log('err');
    });
  };
};

export const deleteScheduleFB = (schedule) => {
  return function (dispatch, getState) {
  let _schedule_data = getState().schedule.plan;
  let schedule_data = {};
  for (let i = 0; i < _schedule_data.length; i++){
    if (_schedule_data[i].text === schedule.text && _schedule_data[i].date === schedule.date){
      schedule_data = _schedule_data[i];
    }
  }
  console.log(schedule_data.id)
  console.log(schedule)
  schedule_db.doc(schedule_data.id).delete().then((res) => {
    dispatch(deleteSchedule(Schedule));
    dispatch(isLoaded(true));
  }).catch((err) => {
    console.log('err');
  });
};
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "schedule/LOAD":{
      if(action.schedule.length > 0){
        return {plan: action.schedule, is_loaded: true};
      }
      return state;
    }

    case "schedule/CREATE":{
      const new_schedule_plan = [...state.plan, action.schedule];
      return {plan: new_schedule_plan};}

    case "schedule/UPDATE":{
      const schedule_plan = state.plan.map((l, idx) => {
        if(l.text ===  action.schedule.text && l.date === action.schedule.date){
          return {...l, completed: true};
        } else {
          return l;
        }
      })
      return {plan: schedule_plan};
    }
    case "schedule/DELETE": {
      const schedule_plan = state.plan.filter((l, idx) => {
        if(l.date !== action.schedule.date && l.time !== action.schedule.time){
          return l;
        } 
      });
      return {plan: schedule_plan};
    }

    case "schedule/LOADED": {
      return {...state, is_loaded: action.loaded};
    }

    default:
      return state;
  }
}