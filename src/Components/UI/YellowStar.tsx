interface YellowStarProps {
  width: number;
}

const YellowStar = (props: YellowStarProps) => {
  const { width } = props;
  return (
    <div
      style={{
        backgroundImage: `url(
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 14 13' %3E%3Cpath id='star' d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z' transform='translate(-2 -2)' fill='%23ffd400' /%3E%3C/svg%3E"
  )`,
        width: `${width}%`,
      }}
      className="h-[50px] bg-repeat-x"
    />
  );
};

export default YellowStar;
