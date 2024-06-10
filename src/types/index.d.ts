type Desk = {
  id: number;
  type: "individual" | "team";
  membership?: "basic" | "premium" | "executive";
  booked: boolean;
};
