import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allDoctorInfor: [],
  listClinic: [],
  listSpecialty: []
};

const adminReducer = (state = initialState, action) => {
  //state la cai cu , action la du lieu tu ben action moi cap nhat chuyen qua
  console.log("action redux", action);
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_INFOR_SUCCESS:
      state.allDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_INFOR_FAILED:
      state.allDoctorInfor = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_LIST_CLINIC_SUCCESS:
      state.listClinic = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_CLINIC_FAILED:
      state.listClinic = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_SPECIALTY_SUCCESS:
      state.listSpecialty = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_SPECIALTY_FAILED:
      state.listSpecialty = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
