"use client";

import { useRouter } from "next/navigation";

type Props = {
  isLoggedIn: boolean;
  onPressLogin: () => Promise<void>;
};
export const Header = ({ isLoggedIn, onPressLogin }: Props) => {
  const router = useRouter();

  const _onPressLogin = async () => {
    await onPressLogin();
    router.refresh();
  };

  return (
    <div className="flex flex-row justify-end px-6 py-4">
      <button
        className="w-20 h-8 rounded-md bg-white text-gray-700 text-sm"
        onClick={_onPressLogin}
      >
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
};
