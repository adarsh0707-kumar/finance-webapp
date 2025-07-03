"use client"

import { NewAccountsSheet } from "@/features/accounts/components/new-accounts-sheet"
import { useMountedState } from "react-use"

export const SheetProvider = () => {

  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountsSheet />
    </>
  )
}
