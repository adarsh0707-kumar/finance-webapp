"use client"
import { useMountedState } from "react-use"

import { EditAccountsSheet } from "@/features/accounts/components/edit-accounts-sheet"
import { NewAccountsSheet } from "@/features/accounts/components/new-accounts-sheet"


export const SheetProvider = () => {

  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountsSheet />
      <EditAccountsSheet />
    </>
  )
}
