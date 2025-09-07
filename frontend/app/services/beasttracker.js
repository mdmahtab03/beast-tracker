let beasttracker = {
  streak: 0,
  longest: 0,
  lastCheck: "",
  history: []
};


const updateData = (beasttracker)=>{
    localStorage.setItem("beasttracker",JSON.stringify(beasttracker));
}

export { updateData, beasttracker}