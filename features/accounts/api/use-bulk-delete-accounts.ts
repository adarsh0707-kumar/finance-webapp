import { toast } from "sonner";
import { client } from "@/lib/hono"

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];


export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
      mutationFn: async (json) => {
        
          const response = await client.api.accounts["bulk-delete"].$post({
            json,
          });

          return await response.json();
        
      },
      onSuccess: () => {
        toast.success("Accounts Deleted")
        queryClient.invalidateQueries({
          queryKey: ["accounts"]
        })
        // TODO: Also invalidate summary
        
      },
      onError: (err) => {
        console.log("error: ",err)
        toast.error("Failed to delete account")
      },
    })
  
  return mutation
}