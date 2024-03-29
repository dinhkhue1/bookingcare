import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialty,
  getAllClinic,
  editSpecialty,
  deleteSpecialtyService,
  editClinic,
  deleteClinicService
} from "../../services/userService";

import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log(e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch(fetchAllUsersFailed());
      console.log(error);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch(deleteUserFailed());
      console.log(error);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch(editUserFailed());
      console.log(error);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED });
      console.log(error);
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      console.log(error);
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(editUserFailed());
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      console.log(error);
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
      console.log(e);
    }
  };
};

export const getAllDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_DOCTOR_INFOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty.errCode === 0 &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchDoctorInforSuccess(data));
      } else {
        dispatch(fetchDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchDoctorInforFailed());
      console.log(e);
    }
  };
};

export const fetchDoctorInforSuccess = (allData) => ({
  type: actionTypes.FETCH_DOCTOR_INFOR_SUCCESS,
  data: allData,
});
export const fetchDoctorInforFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_INFOR_FAILED,
});


export const getAllListCLinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_LIST_CLINIC_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_LIST_CLINIC_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_LIST_CLINIC_FAILED,
      });
      console.log(e);
    }
  };
};

export const getAllListSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_LIST_SPECIALTY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_LIST_SPECIALTY_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_LIST_SPECIALTY_FAILED,
      });
      console.log(e);
    }
  };
};

export const AdminEditSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialty(data);

      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch(editSpecialtySuccess());
        dispatch(getAllListSpecialty());
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(editSpecialtyFailed());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch(editSpecialtyFailed());
      console.log(error);
    }
  };
};

export const editSpecialtySuccess = () => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS,
});
export const editSpecialtyFailed = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAILED,
});

export const deleteSpecialty = (Id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteSpecialtyService(Id);
      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch(deleteSpecialtySuccess());
        dispatch(getAllListSpecialty());
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(deleteSpecialtyFailed());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch(deleteSpecialtyFailed());
      console.log(error);
    }
  };
};
export const deleteSpecialtySuccess = () => ({
  type: actionTypes.DELETE_SPECIALTY_SUCCESS,
});
export const deleteSpecialtyFailed = () => ({
  type: actionTypes.DELETE_SPECIALTY_FAILED,
});


export const adminEditClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editClinic(data);

      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch(editClinicSuccess());
        dispatch(getAllListCLinic());
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(editClinicFailed());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch(editClinicFailed());
      console.log(error);
    }
  };
};

export const editClinicSuccess = () => ({
  type: actionTypes.EDIT_CLINIC_SUCCESS,
});
export const editClinicFailed = () => ({
  type: actionTypes.EDIT_CLINIC_FAILED,
});

export const deleteClinic = (Id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinicService(Id);
      if (res && res.errCode === 0) {
        toast.success("Thành công!");
        dispatch(deleteClinicSuccess());
        dispatch(getAllListCLinic());
      } else {
        toast.error("Đã xảy ra lỗi ....");
        dispatch(deleteClinicFailed());
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi ....");
      dispatch(deleteClinicFailed());
      console.log(error);
    }
  };
};
export const deleteClinicSuccess = () => ({
  type: actionTypes.DELETE_CLINIC_SUCCESS,
});
export const deleteClinicFailed = () => ({
  type: actionTypes.DELETE_CLINIC_FAILED,
});