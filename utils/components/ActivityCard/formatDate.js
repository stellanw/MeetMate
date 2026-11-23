// check date to display date, weekday, "Heute" or "Morgen" //////////////////////////////
export default function formatDate(date) {
  const eventDate = new Date(date);
  const today = new Date();

  if (eventDate.toDateString() === today.toDateString()) {
    return "Heute";
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

  if (eventDate < today) {
    return eventDate.toLocaleDateString("de-DE");
  } else if (eventDate < tomorrow) {
    return "Morgen";
  } else if (eventDate > oneWeekFromNow) {
    return eventDate.toLocaleDateString("de-DE");
  } else {
    return eventDate.toLocaleDateString("de-DE", { weekday: "long" });
  }
}
