import moment from "moment";

export const formatDateText = (data) => {
  return moment(data).format("DD MMM YYYY, HH:mm:ss");
};

export const formatDateNumber = (data) => {
  return moment(data).format("DD/MM/YYYY, HH:mm:ss");
};
