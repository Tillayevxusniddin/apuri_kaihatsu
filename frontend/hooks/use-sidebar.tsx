"use client"

import * as React from "react"

const SIDEBAR_STORAGE_KEY = "sidebar:state"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

export const SidebarProvider: React.FC<{
  children: React.ReactNode
  defaultOpen?: boolean
}> = ({ children, defaultOpen = true }) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  React.useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    if (savedState !== null) {
      setOpen(JSON.parse(savedState))
    }
  }, [])

  const setOpenState = React.useCallback((value: boolean) => {
    setOpen(value)
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(value))
  }, [])

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpenState(!open)
    }
  }, [isMobile, setOpenState, open])

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen: setOpenState,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, openMobile, isMobile, setOpenState, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

