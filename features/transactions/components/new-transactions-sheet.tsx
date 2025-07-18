import { z } from "zod";
import { Loader2 } from "lucide-react";
import { insertTransactionSchema } from "@/db/schema";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useCreateCategory } from "@/features/categories/api/use-create-categories";
import { TransactionForm } from "@/features/transactions/components/transactions-form"
import { useNewTransactions } from "@/features/transactions/hooks/use-new-transactions"
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

const formSchema = insertTransactionSchema.omit({
  id: true,
})

type FormValues = z.input<typeof formSchema>


export const NewTransactionsSheet = () => {
  
  const { isOpen, onClose } = useNewTransactions();

  const createMutation = useCreateTransaction()

  const categoryMutation = useCreateCategory()
  const categoryQuery = useGetCategories()
  const onCreateCategory = (name: string) => categoryMutation.mutate({
    name
  })

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }))

  const accountMutation = useCreateAccount()
  const accountQuery = useGetAccounts()
  const onCreateAccount = (name: string) => accountMutation.mutate({
    name
  })
  
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }))

  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  
  const isLoading =
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
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
            New Transactions
          </SheetTitle>
          <SheetDescription>
            Create a new transactions
          </SheetDescription>
        </SheetHeader>
        {
          isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />

            </div>
          )
          : (
            <TransactionForm
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )
        }
        

      </SheetContent>
    </Sheet>
  )
}
