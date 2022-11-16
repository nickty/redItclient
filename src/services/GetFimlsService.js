import axios from "axios";

export async function getAllData() {
  try {
    const { data } = await axios.get("/api/v1/people");
    return data;
  } catch (error) {
    return [];
  }
}
