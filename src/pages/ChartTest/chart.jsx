export const pieData = [
  { id: 0, value: 30, label: 'Student' },
  { id: 1, value: 20, label: 'Staff' },
  { id: 2, value: 25, label: 'Meal' },
  { id: 3, value: 10, label: 'Complain' }
];

export const barData = [
  { label: 'Student', value: 3000 },
  { label: 'Staff', value: 2000 },
  { label: 'Meal', value: 2500 },
  { label: 'Complain', value: 1000 }
];

export const lineData = {
  labels: ["Student", "Staff", "Meal", "Complain"],
  series: [
    {
      name: "pv",
      data: [2400, 1500, 1800, 900]
    },
    {
      name: "uv",
      data: [3000, 2000, 2500, 1000]
    }
  ]
};
