import { z } from "zod"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { insertTransactionSchema } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { convertAmountToMiliunits } from "@/lib/utils"

import { Select } from "@/components/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { AmountInput } from "@/components/amount-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"


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
    const amount = parseFloat(values.amount)
    const amountInMiliunits = convertAmountToMiliunits(amount)

    console.log("values", values)
    onSubmit({
      ...values,
      amount: amountInMiliunits
    })

    
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
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">
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

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">
                Payee
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Add a payee"
                />

              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">
                Amount
              </FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  onChange={field.onChange}
                  disabled={disabled}
                  placeholder="0.00"
                />

              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">
                Notes
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Optional notes"
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