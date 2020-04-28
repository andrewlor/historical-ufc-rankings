import moment from "moment";

export const formatDate = (date) => moment(date).format("MMM Do, YYYY");
