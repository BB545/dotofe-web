import { useEffect, useState } from 'react';
import './App.css';
import logoImage from './assets/images/logo.svg';
import { getRewardPreview, type RewardPreview } from './apis/reward';

const formatToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

function App() {
  const [rewardInfo, setRewardInfo] =
    useState<RewardPreview | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchRewardInfo = async () => {
      const params = new URLSearchParams(
        window.location.search,
      );

      const rewardCode = params.get('code');

      if (!rewardCode) {
        setErrorMessage('보상 코드가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        const data =
          await getRewardPreview(rewardCode);

        setRewardInfo(data);
      } catch (error) {
        console.error(
          '보상 정보 조회 실패:',
          error,
        );

        setErrorMessage(
          '보상 정보를 확인할 수 없습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewardInfo();
  }, []);

  const handleReward = () => {
    console.log('보상 지급');
  };

  if (isLoading) {
    return (
      <main className="page">
        <div className="loading">
          조회 중...
        </div>
      </main>
    );
  }

  if (errorMessage || !rewardInfo) {
    return (
      <main className="page">
        <div className="loading">
          {errorMessage}
        </div>
      </main>
    );
  }

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
            value={rewardInfo.memberNickname}
          />

          <InfoField
            label="핀번호"
            value={rewardInfo.pinNumber}
          />

          <InfoField
            label="투어 이름"
            value={rewardInfo.tourName}
          />

          <InfoField
            label="보상 수령일"
            value={formatToday()}
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