import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MenuView from "../views/MenuView";
import LevelView from "../views/LevelView";
import Loader from "../components/Loader/Loader";
import Layout from "../layouts/Layout";
import { useAppStore } from "../store/useAppStore";

// El componente Router es el que se encarga de renderizar las rutas
export default function Router() {
  const unlockedLevelsList = useAppStore((state) => state.unlockedLevelsList);

  return (
    <BrowserRouter>
      <Routes>
        {/* Agrupa una ruta para mostrar un Layout, un componente que se mostrara en todas las rutas hijas */}
        <Route element={<Layout />}>
          {/* Pagina de inicio */}
          <Route
            path="/"
            index
            element={
              <Suspense fallback={<Loader />}>
                <MenuView />
              </Suspense>
            }
          />
          {/* Por cada nivel desbloqueado se renderiza una ruta */}
          {unlockedLevelsList.map((level) => (
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
          {/* Si la ruta no existe se redirige a la ruta "/"" */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}