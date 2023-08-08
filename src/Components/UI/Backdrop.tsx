interface BackdropProps {
  onClick?: () => void;
}

const Backdrop = ({ onClick }: BackdropProps) => {
  return (
    <div
      onClick={onClick}
      className="z-10 bg-black/50 w-screen h-screen absolute top-0 left-0 flex justify-center items-center"
    />
  );
};

export default Backdrop;
