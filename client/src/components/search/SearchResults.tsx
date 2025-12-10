import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import SearchResultCard from "./SearchResultCard";
import type { SearchResultItem } from "@/types";

interface SearchResultsProps {
  studios: SearchResultItem[];
  dancers: SearchResultItem[];
  hasMoreDancers: boolean;
  onLoadMore: () => void;
  onResultClick: (item: SearchResultItem) => void;
  className?: string;
}

/**
 * SearchResults 컴포넌트
 * 검색 결과 목록 표시 (무한 스크롤)
 */
export default function SearchResults({
  studios,
  dancers,
  hasMoreDancers,
  onLoadMore,
  onResultClick,
  className,
}: SearchResultsProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  // 무한 스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreDancers) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMoreDancers, onLoadMore]);

  const hasResults = studios.length > 0 || dancers.length > 0;

  if (!hasResults) {
    return (
      <div className={cn("text-center py-20", className)}>
        <p className="text-gray-400 text-[14px]">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* 스튜디오 결과 */}
      {studios.length > 0 && (
        <div>
          <h3 className="text-[14px] font-semibold mb-2 px-4 text-gray-600">
            스튜디오 ({studios.length})
          </h3>
          <div>
            {studios.map((studio) => (
              <SearchResultCard
                key={studio.id}
                item={studio}
                onClick={onResultClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* 댄서 결과 */}
      {dancers.length > 0 && (
        <div>
          <h3 className="text-[14px] font-semibold mb-2 px-4 text-gray-600">
            댄서 ({dancers.length}
            {hasMoreDancers ? "+" : ""})
          </h3>
          <div>
            {dancers.map((dancer) => (
              <SearchResultCard
                key={dancer.id}
                item={dancer}
                onClick={onResultClick}
              />
            ))}
          </div>

          {/* 무한 스크롤 트리거 */}
          {hasMoreDancers && <div ref={observerTarget} className="h-4" />}
        </div>
      )}
    </div>
  );
}
