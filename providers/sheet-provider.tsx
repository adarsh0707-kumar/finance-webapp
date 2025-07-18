"use client"
import { useMountedState } from "react-use"

import { NewAccountsSheet } from "@/features/accounts/components/new-accounts-sheet"
import { EditAccountsSheet } from "@/features/accounts/components/edit-accounts-sheet"
import { NewCategoriesSheet } from "@/features/categories/components/new-category-sheet"
import { EditCategoriesSheet } from "@/features/categories/components/edit-category-sheet"
import { NewTransactionsSheet } from "@/features/transactions/components/new-transactions-sheet"


export const SheetProvider = () => {

  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountsSheet />
      <EditAccountsSheet />
      
      <NewCategoriesSheet />
      <EditCategoriesSheet />

      <NewTransactionsSheet />
    </>
  )
}
