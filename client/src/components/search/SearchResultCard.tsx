import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { SearchResultItem } from "@/types";

interface SearchResultCardProps {
  item: SearchResultItem;
  onClick?: (item: SearchResultItem) => void;
  className?: string;
}

/**
 * SearchResultCard 컴포넌트
 * 검색 결과 개별 카드 (댄서/스튜디오 공통)
 */
export default function SearchResultCard({
  item,
  onClick,
  className,
}: SearchResultCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.(item);

    // 상세 페이지로 이동
    const path = item.type === "dancer" ? `/dancer/${item.id}` : `/studio/${item.id}`;
    navigate(path);
  };

  const roleLabel = item.type === "dancer" ? "Dancer" : "Studio";

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full h-[60px] px-4",
        "border-b border-gray-200",
        "flex items-center justify-between",
        "cursor-pointer hover:bg-gray-50 transition-colors",
        className
      )}
    >
      {/* 좌측: 이름 + Role */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[14px] font-semibold text-gray-900">
          {item.name}
        </h3>
        <p className="text-[12px] text-gray-500">{roleLabel}</p>
      </div>

      {/* 우측: > 버튼 */}
      <button
        className="text-gray-400 text-[20px] font-light"
        aria-label={`${item.name} 상세보기`}
      >
        &gt;
      </button>
    </div>
  );
}
