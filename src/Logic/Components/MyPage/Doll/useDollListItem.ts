import useDelete from "@/hooks/useDelete";
import { Doll } from "@/types/doll";
import { useQueryClient } from "@tanstack/react-query";

const useDollListItem = (doll: Doll) => {
  const queryClient = useQueryClient();

  const { mutate: deleteDoll } = useDelete(`/child/${doll.id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries(["child"]);
    },
  });

  return { deleteDoll };
};

export default useDollListItem;
