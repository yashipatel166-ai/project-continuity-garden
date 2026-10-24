import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { defaultFor, type PageId } from "@/lib/content-fields";

export const contentQueryKey = ["site_content"] as const;

/** Returns a getter for admin-edited values; falls back to built-in defaults. */
export function useContent(page: PageId) {
  const { data } = useQuery({
    queryKey: contentQueryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("page,key,value");
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
  return (key: string) => {
    const row = data?.find((r) => r.page === page && r.key === key);
    return row && row.value !== "" ? row.value : defaultFor(page, key);
  };
}
