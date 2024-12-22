"use client"

import * as React from "react"
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from "next/navigation"
import { Link } from "@/navigation"
import { useTranslations } from "next-intl"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  // Qo'llab-quvvatlanadigan tillarni belgilang
  const supportedLanguages = ['en', 'ru', 'uz', 'ja']
  const defaultLanguage = 'en'

  const generateBreadcrumbs = () => {
    let paths = pathname.split("/").filter((path) => path)
    let breadcrumbs = [
      { href: "/", label: <Home className="h-4 w-4" /> },
    ]

    // Tilni birinchi segment sifatida tekshirish
    if (!supportedLanguages.includes(paths[0])) {
      paths = [defaultLanguage, ...paths] // Default tilni qo'shish
    }

    let currentPath = ""
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      breadcrumbs.push({
        href: currentPath,
        label: index === 0 ? path.toUpperCase() : t(path), // Birinchi segment (til) bosh harflar bilan
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            {index > 0 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

