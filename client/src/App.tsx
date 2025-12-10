import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  MainPage,
  SearchPage,
  DancerDetailPage,
  StudioDetailPage,
} from "@/pages";

// 임시 상세 페이지 컴포넌트 (추후 구현)

function App() {
  return (
    <Routes>
      {/* Layout Route: MainLayout이 모든 자식 라우트를 감쌈 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dancer/:id" element={<DancerDetailPage />} />
        <Route path="/studio/:id" element={<StudioDetailPage />} />
        {/* 추후 라우트 추가 시 여기에 추가 */}
      </Route>
    </Routes>
  );
}

export default App;
