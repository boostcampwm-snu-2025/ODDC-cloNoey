import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/calendar";
import { Logo, SearchBar } from "@/components/common";
import { mockDancers, mockClasses } from "@/data";
import ArrowLeftIcon from "@/assets/icons/arrow_left.svg";

/**
 * DancerDetailPage - 댄서 상세 페이지
 * 댄서 클래스 일정 표시
 */
export default function DancerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dancer = mockDancers.find((d) => d.dancer_id === id);

  if (!dancer) {
    return (
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">
          댄서를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 mt-2">
          해당 ID의 댄서가 존재하지 않습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 상단바 (정적) */}
      <div
        className="bg-white px-12 sm:px-16 md:px-24 lg:px-32 py-5"
        style={{ boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" }}
      >
        {/* 로고 - 메인페이지로 이동 */}
        <Link to="/">
          <Logo />
        </Link>

        {/* 검색바 영역 */}
        <div className="mt-3 flex items-center justify-center gap-3">
          {/* 왼쪽 뒤로가기 버튼 */}
          <button
            onClick={() => navigate("/search")}
            className="hover:opacity-70 transition-opacity flex-shrink-0"
            aria-label="검색 페이지로 이동"
          >
            <img src={ArrowLeftIcon} alt="뒤로가기" className="w-6 h-6" />
          </button>

          {/* 검색바 */}
          <SearchBar
            placeholder="어떤 댄서의 일정을 찾으시나요?"
            className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px]"
          />
        </div>
      </div>

      {/* 캘린더 */}
      <div className="px-4 py-8">
        <Calendar entity={dancer} entityType="dancer" classes={mockClasses} />
      </div>
    </div>
  );
}
