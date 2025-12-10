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
        <p className="text-gray-400 text-[14px]">최근 검색어가 없습니다</p>
      </div>
    );
  }

  const renderSearchItem = (item: RecentSearchItem) => (
    <div
      key={item.id}
      className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg group"
    >
      {/* 클릭 가능한 검색어 영역 */}
      <button
        onClick={() => onSearchItemClick(item)}
        className="flex-1 text-left text-[14px] text-gray-700"
      >
        {item.name}
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
      {/* 댄서 최근 검색어 */}
      {recentDancers.length > 0 && (
        <div>
          <h3 className="text-[16px] font-semibold mb-3 px-4">
            최근 검색한 댄서
          </h3>
          <div className="space-y-1">
            {recentDancers.map(renderSearchItem)}
          </div>
        </div>
      )}

      {/* 스튜디오 최근 검색어 */}
      {recentStudios.length > 0 && (
        <div>
          <h3 className="text-[16px] font-semibold mb-3 px-4">
            최근 검색한 스튜디오
          </h3>
          <div className="space-y-1">
            {recentStudios.map(renderSearchItem)}
          </div>
        </div>
      )}
    </div>
  );
}
