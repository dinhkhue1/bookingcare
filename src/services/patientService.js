import db from "../models/index";
import _ from "lodash";
import res from "express/lib/response";
import emailService from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          languge: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });

        //update patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            // neu khong co email ham nay se tu tao 1 cai email moi
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstname: data.fullName,
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor patient sucsses!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  //cap nhat lai status khi benh nhan chung thuc
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`; // tu tao mot duong link
  return result;
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
