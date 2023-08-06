import ReservationBar from "@/Components/Counselor/ReservationBar";
import Line from "@/Components/UI/Line";
import useCounselorDetailPage from "@/Logic/routes/useCounselorDetailPage";

const CounselorDetailPage = () => {
  const { data, isLoading, error } = useCounselorDetailPage();

  if (isLoading) return <h1>로딩 중</h1>;
  if (error) return <h1>에러 발생</h1>;
  if (!data) return <h1>상담사님이 자기 소개를 등록하지 않았어요.</h1>;

  return (
    <div>
      <div className="flex justify-around items-start mt-14">
        <img
          src={data.profile.thumbnail}
          className="w-[320px] h-[320px] border-black border-2"
          alt="프로필 사진"
        />
        <div>
          <h1 className="text-5xl">{data.profile.name} 상담사님</h1>
          <p>경력</p>
          {data.career.map((career) => (
            <div key={career.name}>
              <span>
                {career.name} {career.start_date} ~ {career.end_date}
              </span>
            </div>
          ))}
          <p>자격증</p>
          {data.license.map((license) => (
            <div key={license.name}>
              <span>
                {license.name} - {license.organization}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Line />
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <ReservationBar />
    </div>
  );
};

export default CounselorDetailPage;
