import { toast } from "sonner";
import { client } from "@/lib/hono"
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error
    >({
      mutationFn: async () => {
        const response = await client.api.accounts[":id"]["$delete"]({
          param: { id }
        })
        console.log("Create :- ",response)
        return await response.json()
      },
      onSuccess: () => {
        toast.success("Account Deleted")
        queryClient.invalidateQueries({ queryKey: ["account", { id }] })
        queryClient.invalidateQueries({ queryKey: ["accounts"] });

        // TODO: Invalidate summary and transactions


      },
      onError: () => {
        toast.error("Failed to deleted account")
      },
    })
  
  return mutation
}