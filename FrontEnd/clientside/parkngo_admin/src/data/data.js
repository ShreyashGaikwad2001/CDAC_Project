import axios from "axios";

export const fetched_data = await axios.get("http://localhost:9443/admin/users-list");


export const occupancy_data = [
  { time: "00:00", occupancy: 4000 },
  { time: "01:00", occupancy: 3400 },
  { time: "02:00", occupancy: 2300 },
  { time: "03:00", occupancy: 2800 },
  { time: "04:00", occupancy: 1500 },
  { time: "05:00", occupancy: 2000 },
  { time: "06:00", occupancy: 3000 },
  { time: "07:00", occupancy: 3500 },
  { time: "08:00", occupancy: 4000 },
  { time: "09:00", occupancy: 4500 },
  { time: "10:00", occupancy: 5000 },
  { time: "11:00", occupancy: 5500 },
  { time: "12:00", occupancy: 8000 },
  { time: "13:00", occupancy: 6500 },
  { time: "14:00", occupancy: 7000 },
  { time: "15:00", occupancy: 3000 },
  { time: "16:00", occupancy: 8000 },
  { time: "17:00", occupancy: 8500 },
  { time: "18:00", occupancy: 9000 },
  { time: "19:00", occupancy: 7500 },
  { time: "20:00", occupancy: 6000 },
  { time: "21:00", occupancy: 1500 },
  { time: "22:00", occupancy: 1000 },
  { time: "23:00", occupancy: 500 },
  { time: "24:00", occupancy: 100 },
];
