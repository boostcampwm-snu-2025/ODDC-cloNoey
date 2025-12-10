import { cn } from "@/lib/utils";
import type { Studio } from "@/types";
import MapPin from "./MapPin";
import mapImage from "@/assets/images/seoul_map.png";

interface StudioMapViewProps {
  studios: Studio[];
  className?: string;
}

/**
 * StudioMapView 컴포넌트
 * 서울 지도 배경 위에 스튜디오 핀을 표시
 */
export default function StudioMapView({
  studios,
  className,
}: StudioMapViewProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] rounded-lg overflow-hidden px-8",
        className
      )}
    >
      {/* 배경 지도 이미지 */}
      <div className="absolute inset-0">
        <img
          src={mapImage}
          alt="서울 지도"
          className="w-full h-full object-cover"
          onError={(e) => {
            // 이미지 로드 실패 시 fallback
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* 스튜디오 핀들 */}
      {studios
        .filter((studio) => studio.coordinates)
        .map((studio) => (
          <MapPin key={studio.studio_id} studio={studio} />
        ))}
    </div>
  );
}
