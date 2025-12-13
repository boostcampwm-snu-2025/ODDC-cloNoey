/**
 * 검색 관련 타입 정의
 */

/**
 * 검색 대상 타입
 */
export type SearchResultType = "dancer" | "studio";

/**
 * 통합 검색 결과 아이템
 * 댄서와 스튜디오를 모두 표현할 수 있는 통합 타입
 */
export interface SearchResultItem {
  id: string; // dancer_id 또는 studio_id
  name: string;
  type: SearchResultType;
  instagram: string;
}

/**
 * 최근 검색어 아이템
 */
export interface RecentSearchItem {
  id: string; // 검색 대상의 ID
  name: string;
  type: SearchResultType;
  searchedAt: number; // timestamp
}

/**
 * 무한 스크롤 페이지 데이터
 */
export interface InfiniteSearchPage {
  dancers: SearchResultItem[];
  nextCursor: number | null; // 다음 페이지 시작 인덱스 (null이면 마지막)
  hasMore: boolean;
}
