import { toast } from "sonner";
import { client } from "@/lib/hono"
import {  InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });
      console.log("Create :- ", response);
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction Deleted");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error("Failed to deleted transaction!");
    },
  });

  return mutation;
};