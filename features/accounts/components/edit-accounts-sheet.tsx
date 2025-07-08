import { z } from "zod";

import { insertAccountSchema } from "@/db/schema";

import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react";

const formSchema = insertAccountSchema.pick({

  name: true,
})

type FormValues = z.input<typeof formSchema>


export const EditAccountsSheet = () => {
  
  const { isOpen, onClose, id } = useOpenAccount();

  const mutation = useCreateAccount()

  const accountQuery = useGetAccount(id)

  const isLoading = accountQuery.isLoading

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
  } : {
    name: "",
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="mt-5">
          <SheetTitle>
            Edit Account
          </SheetTitle>
          <SheetDescription>
            Edit an existing account.
          </SheetDescription>
        </SheetHeader>
        {
          isLoading ? (
            <div className="abolute inset-0 flex items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin"/>

            </div>
          ) : (
              
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={mutation.isPending}
              defaultValues={defaultValues}
            />
          )
        }

      </SheetContent>
    </Sheet>
  )
}
