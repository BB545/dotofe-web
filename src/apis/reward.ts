import axios from 'axios';

export type RewardPreview = {
  memberNickname: string;
  pinNumber: string;
  tourName: string;
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRewardPreview = async (
  rewardCode: string,
): Promise<RewardPreview> => {
  const response = await axios.get<ApiResponse<RewardPreview>>(
    `${API_BASE_URL}/api/v1/stamp-tours/reward`,
    {
      params: {
        rewardCode,
      },
    },
  );

  return response.data.result;
};