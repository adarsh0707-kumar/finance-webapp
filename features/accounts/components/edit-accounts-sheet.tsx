import { z } from "zod";
import { Loader2 } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";
import { insertAccountSchema } from "@/db/schema";

import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
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

const formSchema = insertAccountSchema.pick({

  name: true,
})

type FormValues = z.input<typeof formSchema>


export const EditAccountsSheet = () => {
  
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  )

  const accountQuery = useGetAccount(id)
  const editMutation = useEditAccount(id)
  const deleteMutation = useDeleteAccount(id)
  const isLoading = accountQuery.isLoading
  const isPending = editMutation.isPending  || deleteMutation.isPending


  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      })
    }
  }

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
  } : {
    name: "",
  }

  return (
    <>
      <ConfirmDialog />
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
                disabled={isPending}
                defaultValues={defaultValues}
                onDelete={onDelete}
              />
            )
          }

        </SheetContent>
      </Sheet>
    </>
  )
}
