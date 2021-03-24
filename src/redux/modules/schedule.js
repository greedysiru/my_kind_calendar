// Actions
const LOAD = 'schedule/LOAD';
const CREATE = 'schedule/CREATE';
const UPDATE = 'schedule/UPDATE';
const DELETE = 'schedule/DELETE';

// 초기값
const initialState = {
   plan: [
     {date: "2021-03-25", 
     time: 1000,
     realTime: "10:00",  
     completed: false, 
     text: "과제 제출하기", 
     color: "a"},
     {date: "2021-03-25", 
     time: 1400, 
     realTime: "14:00",
     completed: false, 
     text: "외식하기", 
     color: "a"},
     {date: "2021-03-25", 
     time: 1600, 
     realTime: "16:00",
     completed: false, 
     text: "운동하기", 
     color: "c"},
     {date: "2021-04-01", 
     time: 1600, 
     realTime: "16:00",
     completed: false, 
     text: "시루 밥주기", 
     color: "c"}
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

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "schedule/LOAD":{
      return state;}

    case "schedule/CREATE":{
      console.log('create')
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

    default:
      return state;
  }
}