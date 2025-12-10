import { cn } from "@/lib/utils";
import searchIcon from "@/assets/icons/search_icon.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * SearchInput 컴포넌트
 * 검색어 입력 필드
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = "댄서 또는 스튜디오를 검색하세요",
  className,
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "relative w-full h-[40px] rounded-[20px]",
        "bg-[#E6E6FA] flex items-center",
        className
      )}
    >
      {/* 입력 필드 */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-full px-4 pr-12",
          "bg-transparent text-[14px] text-[#0C1A58]",
          "placeholder:text-[#0C1A58] placeholder:text-[12px]",
          "focus:outline-none rounded-[20px]"
        )}
        aria-label="검색어 입력"
      />

      {/* 우측 검색 아이콘 */}
      <div className="absolute right-4 w-[22px] h-[22px] pointer-events-none">
        <img src={searchIcon} alt="검색" className="w-full h-full" />
      </div>
    </div>
  );
}
