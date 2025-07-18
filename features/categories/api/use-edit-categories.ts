import { toast } from "sonner";
import { client } from "@/lib/hono"
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<
  typeof client.api.categories[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  typeof client.api.categories[":id"]["$patch"]>["json"];

export const useEditCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$patch"]({
        param: { id },
        json,
      });
      console.log("Create :- ", response);
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category Updated");
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error("Failed to edit category");
    },
  });

  return mutation;
};