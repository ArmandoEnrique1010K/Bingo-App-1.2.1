import { Outlet, useLocation } from "react-router";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";
import MusicButton from "../components/Menu/MusicButton";
import ExitButton from "../components/Menu/ExitButton";
import ResetButton from "../components/Menu/ResetButton";
import { preloadSoundFiles } from "../utils/Audio/preloadSoundFiles";
import { preloadMusicFiles } from "../utils/Audio/preloadMusicFiles";

import CreditsButton from "../components/Menu/CreditsButton";
import HelpButton from "../components/Menu/HelpButton";
import { LOADING_TIME } from "../constants/defaultConfigs";

export default function Layout() {
  const getUnlockedLevelsFromStorage = useAppStore(
    (state) => state.getUnlockedLevelsFromStorage
  );
  const changeStateStartScreenLoading = useAppStore(
    (state) => state.changeStateStartScreenLoading
  );
  const getLevelNumberFromUrl = useAppStore(
    (state) => state.getLevelNumberFromUrl
  );

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    getLevelNumberFromUrl(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setTimeout(() => {
      changeStateStartScreenLoading();
    }, LOADING_TIME);

    preloadMusicFiles();
    preloadSoundFiles();
    getUnlockedLevelsFromStorage();
  }, []);

  return (
    <div className="flex flex-col min-w-full h-screen">
      <div className="flex flex-row items-center justify-start sm:py-0 py-0 px-8 bg-gray-900 text-white shadow-lg">
        <CreditsButton />
        <MusicButton />
        <HelpButton />
        <ResetButton />
        <ExitButton />
      </div>

      <main className="bg-gray-800 flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
