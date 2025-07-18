import { toast } from "sonner";
import { client } from "@/lib/hono"

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];


export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      
        const response = await client.api.categories["bulk-delete"].$post({
          json,
        });

        return await response.json();
    },
    onSuccess: () => {
      toast.success("Categories Deleted");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      // TODO: Also invalidate summary
      
    },
    onError: (err) => {
      console.log("error: ", err);
      toast.error("Failed to delete categories");
    },
  });

  return mutation;
};