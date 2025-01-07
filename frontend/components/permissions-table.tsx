'use client'

import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Permission {
  name: string
  defaultEnabled: boolean
  label: string
}

interface PermissionsTableProps {
  permissions: Permission[]
  labels: {
    permission: string
    status: string
    toggle: string
    enabled: string
    disabled: string
  }
}

export function PermissionsTable({ permissions, labels }: PermissionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">{labels.permission}</TableHead>
          <TableHead>{labels.status}</TableHead>
          <TableHead className="text-right">{labels.toggle}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission.name}>
            <TableCell className="font-medium">
              {permission.label}
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  permission.defaultEnabled
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {permission.defaultEnabled ? labels.enabled : labels.disabled}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <Switch
                checked={permission.defaultEnabled}
                onCheckedChange={() => {}}
                aria-label={`Toggle ${permission.label}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
