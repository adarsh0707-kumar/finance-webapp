import { toast } from "sonner";
import { client } from "@/lib/hono"

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];


export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      
        const response = await client.api.transactions["bulk-create"].$post({
          json,
        });

        return await response.json();
      
    },
    onSuccess: () => {
      toast.success("Transactions created");
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      // TODO: Also invalidate summary
      
    },
    onError: (err) => {
      console.log("error: ", err);
      toast.error("Failed to create transactions!");
    },
  });

  return mutation;
};