let beasttracker = {
  streak: 0,
  longest: 0,
  lastCheck: "",
  history: []
};

const getAll = ()=>{
    if(localStorage.getItem("beasttracker")){
        Object.assign(beasttracker,JSON.parse(localStorage.getItem("beasttracker")));
    }
    else  {
        updateData(beasttracker);
        console.log("data is not present", localStorage.getItem("beasttracker"))
    }
}

const updateData = (beasttracker)=>{
    localStorage.setItem("beasttracker",JSON.stringify(beasttracker));
}

export {getAll, updateData, beasttracker}