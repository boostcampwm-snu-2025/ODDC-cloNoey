import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { SearchResultItem } from "@/types";
import arrowRightIcon from "@/assets/icons/arrow_right.svg";

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
    const path =
      item.type === "dancer" ? `/dancer/${item.id}` : `/studio/${item.id}`;
    navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full h-[40px] px-4",
        "flex items-center justify-between",
        "cursor-pointer hover:bg-gray-50 transition-colors",
        className
      )}
    >
      {/* 좌측: 이름 + Role */}
      <div className="flex flex-col gap-1">
        <h3
          className="flex font-semibold text-gray-900 items-center"
          style={{ fontSize: "var(--text-base)" }}
        >
          <span>{item.name}</span>
          {/* 구분선 (연한 회색) */}
          <span className="mx-1.5 text-gray-300">|</span>

          {/* 타입 (회색, 작은 글씨, 기울임체) */}
          <span
            className="text-gray-400 italic"
            style={{ fontSize: "var(--text-sm)" }}
          >
            @{item.instagram}
          </span>
        </h3>
      </div>

      {/* 우측: > 버튼 */}
      <button
        className="text-gray-400 font-light"
        style={{ fontSize: "var(--text-2xl)" }}
        aria-label={`${item.name} 상세보기`}
      >
        <img
          src={arrowRightIcon}
          alt="상세 페이지로"
          className="w-[10px] h-[10px]"
        />
      </button>
    </div>
  );
}
