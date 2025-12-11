import { cn } from "@/lib/utils";
import type { CalendarDayData } from "@/types";

interface CalendarDayProps {
  dayData: CalendarDayData;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * CalendarDay 컴포넌트
 * 개별 날짜 셀 렌더링
 */
export default function CalendarDay({
  dayData,
  isSelected,
  onClick,
  className,
}: CalendarDayProps) {
  const { date, isCurrentMonth, isToday, classes } = dayData;
  const hasClasses = classes.length > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "aspect-square flex flex-col items-center justify-center",
        "cursor-pointer transition-colors",
        "hover:bg-gray-50",
        !isCurrentMonth && "opacity-40",
        className
      )}
      style={{
        backgroundColor: isSelected ? "var(--color-primary-bg)" : undefined,
      }}
    >
      {/* 날짜 숫자 */}
      <div
        className={cn(
          "font-medium",
          "flex items-center justify-center",
          "w-8 h-8 rounded-full",
          isCurrentMonth ? "text-gray-900" : "text-gray-400"
        )}
        style={{
          fontSize: "var(--text-base)",
          borderWidth: isToday ? "2px" : undefined,
          borderStyle: isToday ? "solid" : undefined,
          borderColor: isToday ? "var(--color-primary)" : undefined,
        }}
      >
        {date.getDate()}
      </div>

      {/* 클래스 있을 때 점 표시 */}
      {hasClasses && (
        <div
          className="w-1 h-1 rounded-full mt-1"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
      )}
    </div>
  );
}
