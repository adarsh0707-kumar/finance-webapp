import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"

export const NewAccountsSheet = () => {
  
  const { isOpen, onClose } = useNewAccount();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="mt-5">
          <SheetTitle>
            New Account
          </SheetTitle>
          <SheetDescription>
            Create a new accounts to track your transactions.
          </SheetDescription>
        </SheetHeader>

      </SheetContent>
    </Sheet>
  )
}
