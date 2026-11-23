export default async function handler(request, response) {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "WEATHER_API_KEY is not set" });
  }

  const city = request.query.city || "Berlin";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  try {
    const weatherResponse = await fetch(url);
    const data = await weatherResponse.json();
    return response.status(weatherResponse.status).json(data);
  } catch (error) {
    return response.status(502).json({ error: "Weather service unavailable" });
  }
}
