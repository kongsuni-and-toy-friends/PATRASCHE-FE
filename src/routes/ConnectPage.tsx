const ConnectPage = () => {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-white [&_input]:border-b [&_input]:border-black [&_input]:outline-none">
      <h1>네트워크 연결</h1>
      <div>
        <label className="block" htmlFor="wifi">
          Wi-Fi SSID
        </label>
        <input type="text" id="wifi" name="wifi" />
      </div>
      <div>
        <label className="block" htmlFor="password">
          비밀번호
        </label>
        <input type="text" id="password" name="password" />
      </div>
      <button>설정</button>
    </div>
  );
};

export default ConnectPage;
