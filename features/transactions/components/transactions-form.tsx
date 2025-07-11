import { z } from "zod"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { insertTransactionSchema } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Select } from "@/components/select"


const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
  id?: string,
  defaultValues?: FormValues
  onSubmit: (values: ApiFormValues) => void
  onDelete?: () => void
  disabled?: boolean
  accountOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
  onCreateAccount: (name: string) => void
  onCreateCategory: (name: string) => void
}

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory
}: Props) => {
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  const handleSubmit = (values: FormValues) => {
    // onSubmit(values)
    console.log({values})
  }
  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={
          form.handleSubmit(handleSubmit)
        }
        className="ml-4 mr-4 pt-4"
      >
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Account
              </FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />

              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">
                Category
              </FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />

              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full mt-4" disabled={disabled}>
          {
            id ? "Save Changes" : "Create Account"
          }
        </Button>
        {
          !!id &&
          (
            <Button
              type="button"
              disabled={disabled}
              onClick={handleDelete}
              className="w-full bg-red-800 text-white mt-4"
              variant="outline"
            >
              <Trash className="size-4 mr-2"/>
              Delete Account
            </Button>
          )
        }

      </form>

    </Form>
  )
}