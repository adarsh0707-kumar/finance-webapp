import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
      mutationFn: async (json) => {
        const response = await client.api.accounts.$post({ json })
        console.log("Create :- ",response)
        return await response.json()
      },
      onSuccess: () => {
        toast.success("Account Created")
        queryClient.invalidateQueries({ queryKey: ["accounts"] })
      },
      onError: () => {
        toast.error("Failed to create account")
      },
    })
  
  return mutation
}