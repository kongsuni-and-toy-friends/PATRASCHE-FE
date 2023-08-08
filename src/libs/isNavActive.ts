interface isNavActiveProp {
  isActive: boolean;
}

const isNavActive = ({ isActive }: isNavActiveProp) => {
  if (isActive) return "font-bold";
  else return "";
};

export default isNavActive;
