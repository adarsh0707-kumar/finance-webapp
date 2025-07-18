import { z } from "zod";
import { insertCategorySchema } from "@/db/schema";

import { CategoryForm } from "@/features/categories/components/category-form";
import { useNewCategory } from "@/features/categories/hooks/use-new-categories"
import { useCreateCategory } from "@/features/categories/api/use-create-categories";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"


const formSchema = insertCategorySchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>


export const NewCategoriesSheet = () => {
  
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="mt-5">
          <SheetTitle>
            New Category
          </SheetTitle>
          <SheetDescription>
            Create a new categories to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
          }}
        />

      </SheetContent>
    </Sheet>
  )
}
