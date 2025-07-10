import { toast } from "sonner";
import { client } from "@/lib/hono"
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error
    >({
      mutationFn: async () => {
        const response = await client.api.categories[":id"]["$delete"]({
          param: { id }
        })
        console.log("Create :- ",response)
        return await response.json()
      },
      onSuccess: () => {
        toast.success("Category Deleted");
        queryClient.invalidateQueries({ queryKey: ["category", { id }] });
        queryClient.invalidateQueries({ queryKey: ["categories"] });

        // TODO: Invalidate summary and transactions


      },
      onError: () => {
        toast.error("Failed to deleted category");
      },
    })
  
  return mutation
}