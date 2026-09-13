import './App.css';
import logoImage from './assets/images/logo.svg';

type RewardInfo = {
  nickname: string;
  pinCode: string;
  tourName: string;
  rewardDate: string;
};

const MOCK_REWARD: RewardInfo = {
  nickname: '김만두',
  pinCode: '058471',
  tourName: '거문도백도 은빛바다 체험행사',
  rewardDate: '2026.09.18 (금)',
};

function App() {
  const rewardInfo = MOCK_REWARD;

  const handleReward = () => {
    console.log('보상 지급');
  };

  return (
    <main className="page">
      <section className="content">
        <img
          src={logoImage}
          alt="DOTO"
          className="logo"
        />

        <div className="form">
          <InfoField
            label="닉네임"
            value={rewardInfo.nickname}
          />

          <InfoField
            label="핀번호"
            value={rewardInfo.pinCode}
          />

          <InfoField
            label="투어 이름"
            value={rewardInfo.tourName}
          />

          <InfoField
            label="보상 수령일"
            value={rewardInfo.rewardDate}
          />
        </div>
      </section>

      <footer className="bottomBar">
        <button
          type="button"
          className="rewardButton"
          onClick={handleReward}
        >
          보상 지급하기
        </button>
      </footer>
    </main>
  );
}

type InfoFieldProps = {
  label: string;
  value: string;
};

function InfoField({
  label,
  value,
}: InfoFieldProps) {
  return (
    <div className="field">
      <p className="label">{label}</p>
      <div className="valueBox">
        {value}
      </div>
    </div>
  );
}

export default App;