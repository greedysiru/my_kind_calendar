// Actions
const LOAD = 'schedule/LOAD';
const CREATE = 'schedule/CREATE';

// 초기값
const initialState = {
   plan: [
     {date: "2021-03-25", 
     time: "28000", 
     completed: false, 
     text: "과제 제출하기", 
     important: "a"}
   ]
};

// Action Creator
export const loadSchedule = (schedule) => {
  return {type: LOAD, schedule};
}

export const createSchedule = (schedule) => {
  return {type: CREATE, schedule};
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "schedule/LOAD":
      return state;

    case "schedule/CREATE":
      const new_schedule_plan = [...state.plan, action.schedule];
      return {plan: new_schedule_plan};

    default:
      return state;
  }
}