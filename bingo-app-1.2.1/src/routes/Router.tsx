import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MenuView from "../views/MenuView";
import LevelView from "../views/LevelView";
import Loader from "../components/Loader/Loader";
import Layout from "../layouts/Layout";
import { useAppStore } from "../store/useAppStore";

export default function Router() {
  const unlockedLevels = useAppStore((state) => state.unlockedLevels);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<Loader />}>
              <MenuView />
            </Suspense>
          }
        />
        {unlockedLevels.map((level) => (
          <Route
            key={level}
            path={`/level_${level}`}
            element={
              <Suspense fallback={<Loader />}>
                <LevelView />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

// TODO: Se puede usar una API REST hecha en Node para obtener los datos del nivel, esto solucionaria el problema al recargar la pagina web en un nivel, asi se evitaria que redireccione a la pagina de inicio
