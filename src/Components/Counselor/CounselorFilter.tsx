import useCounselorFilter from "@/Logic/Components/Counselor/useCounselorFilter";

const CounselorFilter = () => {
  const { cityList, townList, villageList, handleOptionChange } =
    useCounselorFilter();

  return (
    <div className="border-b-2 border-black">
      <form>
        <div className="[&_select]:w-40">
          <select name="city" onChange={handleOptionChange}>
            <option value="">시/도</option>
            {cityList &&
              cityList.map((city) => (
                <option key={city.cd} value={city.cd}>
                  {city.addr_name}
                </option>
              ))}
          </select>
          <select name="town" onChange={handleOptionChange}>
            <option value="">구</option>
            {townList &&
              townList.map((town) => (
                <option key={town.cd} value={town.cd}>
                  {town.addr_name}
                </option>
              ))}
          </select>
          <select name="village" onChange={handleOptionChange}>
            <option value="">동</option>
            {villageList &&
              villageList.map((town) => (
                <option key={town.cd} value={town.cd}>
                  {town.addr_name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select>
            <option value="">전문 분야</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <button>검색</button>
        </div>
      </form>
    </div>
  );
};
export default CounselorFilter;
