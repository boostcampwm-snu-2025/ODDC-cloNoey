import { cn } from "@/lib/utils";
import { useRecentSearchStore } from "@/store/useRecentSearchStore";
import type { RecentSearchItem } from "@/types";

interface RecentSearchesProps {
  onSearchItemClick: (item: RecentSearchItem) => void;
  className?: string;
}

/**
 * RecentSearches 컴포넌트
 * 최근 검색어 목록 표시 (검색어 없을 때)
 */
export default function RecentSearches({
  onSearchItemClick,
  className,
}: RecentSearchesProps) {
  const { recentDancers, recentStudios, removeRecentSearch } =
    useRecentSearchStore();

  const hasRecentSearches =
    recentDancers.length > 0 || recentStudios.length > 0;

  if (!hasRecentSearches) {
    return (
      <div className={cn("text-center py-20", className)}>
        <p className="text-gray-400 text-[12px]">최근 검색어가 없습니다</p>
      </div>
    );
  }

  const renderSearchItem = (item: RecentSearchItem) => (
    <div
      key={item.id}
      className="flex items-center justify-between my-3 py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg group"
    >
      {/* 클릭 가능한 검색어 영역 */}
      <button
        onClick={() => onSearchItemClick(item)}
        className="flex-1 text-left text-[12px] text-gray-700 flex items-center"
        aria-label={`최근 검색어: ${item.name}`}
      >
        {/* 이름 (기본 스타일) */}
        <span>{item.name}</span>

        {/* 구분선 (연한 회색) */}
        <span className="mx-1.5 text-gray-300">|</span>

        {/* 타입 (회색, 작은 글씨, 기울임체) */}
        <span className="text-gray-400 text-[10px] italic">{item.type}</span>
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={() => removeRecentSearch(item.id, item.type)}
        className="ml-2 text-gray-400 hover:text-gray-600 text-[16px]"
        aria-label={`${item.name} 삭제`}
      >
        ×
      </button>
    </div>
  );

  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-[14px] font-semibold mb-4 px-2">최근 검색어</h3>
      <div>
        <div className="space-y-1 px-2">
          {recentStudios.map(renderSearchItem)}
          {recentDancers.map(renderSearchItem)}
        </div>
      </div>
    </div>
  );
}
