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
      try {
        const response = await client.api.categories["bulk-delete"].$post({
          json,
        });

        if (!response.ok) {
          // Try to get the error message from the response
          let errorMessage = "Failed to delete categories";
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            console.log(e);
            // If we can't parse JSON, use the status text
            errorMessage = response.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        return await response.json();
      } catch (error) {
        console.error("API Error details:", error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "Failed to delete categories due to an unknown error"
        );
      }
    },
    onSuccess: () => {
      toast.success("Categories Deleted");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      // TODO: Also invalidate summary
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      });
    },
    onError: (err) => {
      console.log("error: ", err);
      toast.error("Failed to delete categories");
    },
  });

  return mutation;
};