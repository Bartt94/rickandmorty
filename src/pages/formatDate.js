import { DateTime } from "luxon";

export const formatDate = (date = null) => {
  if (!date) return "Sin fecha";
  try {
    date = DateTime.fromISO(date)
      .setLocale("es-MX")
      .toFormat("dd MMMM hh:mm")
      .toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS);
    return date;
  } catch (error) {
    return "Sin fecha";
  }
};