"use client"

import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { useDeleteCategory } from "@/features/categories/api/use-delete-categories"
import { useOpenCategory } from "@/features/categories/hooks/use-open-categories"
import { useConfirm } from "@/hooks/use-confirm"


// type Props = {
//   id: string
// }

export const Actions = ({ id }) => {

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  )

  const { onOpen } = useOpenCategory()
  const deleteMutation = useDeleteCategory(id)

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate()
    }
  }
  

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="size-8 p-0"
          >
            
            <MoreHorizontal
              className="size-4"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit
              className="size-4 mr-2"
            />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            
            <Trash
              className="size-4 mr-2"
            />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}