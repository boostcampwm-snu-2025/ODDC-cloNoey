import { useInfiniteQuery } from "@tanstack/react-query";
import { mockStudios, mockDancers } from "@/data";
import type { SearchResultItem, InfiniteSearchPage } from "@/types";

const DANCERS_PER_PAGE = 10;

/**
 * 검색 쿼리 함수
 * 프론트엔드에서 mock 데이터 필터링
 */
const searchData = async (
  searchQuery: string,
  pageParam: number
): Promise<InfiniteSearchPage> => {
  // 검색어가 없으면 빈 결과 반환
  if (!searchQuery.trim()) {
    return {
      dancers: [],
      nextCursor: null,
      hasMore: false,
    };
  }

  const query = searchQuery.toLowerCase().trim();

  // 댄서 필터링 (이름 기반)
  const filteredDancers = mockDancers
    .filter((dancer) => dancer.name.toLowerCase().includes(query))
    .map((dancer) => ({
      id: dancer.dancer_id,
      name: dancer.name,
      type: "dancer" as const,
    }));

  // 페이지네이션 적용
  const start = pageParam * DANCERS_PER_PAGE;
  const end = start + DANCERS_PER_PAGE;
  const paginatedDancers = filteredDancers.slice(start, end);
  const hasMore = end < filteredDancers.length;

  return {
    dancers: paginatedDancers,
    nextCursor: hasMore ? pageParam + 1 : null,
    hasMore,
  };
};

/**
 * 스튜디오 검색 (페이지네이션 없음)
 */
const searchStudios = (searchQuery: string): SearchResultItem[] => {
  if (!searchQuery.trim()) return [];

  const query = searchQuery.toLowerCase().trim();

  return mockStudios
    .filter((studio) => studio.name.toLowerCase().includes(query))
    .map((studio) => ({
      id: studio.studio_id,
      name: studio.name,
      type: "studio" as const,
    }));
};

/**
 * 검색 Hook (무한 스크롤 지원)
 * @param searchQuery 검색어
 * @returns 스튜디오/댄서 검색 결과 및 무한 스크롤 함수
 */
export function useSearchQuery(searchQuery: string) {
  // 댄서 무한 스크롤 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["search", "dancers", searchQuery],
    queryFn: ({ pageParam = 0 }) => searchData(searchQuery, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    enabled: searchQuery.trim().length > 0, // 검색어가 있을 때만 활성화
  });

  // 스튜디오 검색 (일회성)
  const studios = searchStudios(searchQuery);

  // 댄서 데이터 평탄화
  const dancers = data?.pages.flatMap((page) => page.dancers) ?? [];

  return {
    studios,
    dancers,
    hasMoreDancers: hasNextPage ?? false,
    isLoading,
    isFetchingNextPage,
    loadMoreDancers: fetchNextPage,
  };
}
