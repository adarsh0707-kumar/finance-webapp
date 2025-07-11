"use client"

import React from 'react'
import { columns } from './columns'
import { Loader2, Plus } from 'lucide-react'


import { useNewTransactions} from '@/features/transactions/hooks/use-new-transactions'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { useBulkDeleteTransactions} from '@/features/transactions/api/use-bulk-delete-transactions'


import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const TransactionsPage = () => {

  const newTransaction = useNewTransactions()
  const transactionQuery = useGetTransactions()
  const transactionDelete = useBulkDeleteTransactions()


  const transactions = transactionQuery.data || []
  const isDisabled = transactionQuery.isLoading || transactionDelete.isPending

  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex  lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <Button
            onClick={newTransaction.onOpen}
            size="sm"
          >
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={transactions}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              transactionDelete.mutate({ ids });
             }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage