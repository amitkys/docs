import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

interface PackageManagerStore {
  packageManager: PackageManager
  setPackageManager: (pm: PackageManager) => void
}

export const usePackageManager = create<PackageManagerStore>()(
  persist(
    (set) => ({
      packageManager: 'npm',
      setPackageManager: (pm) => set({ packageManager: pm }),
    }),
    {
      name: 'package-manager-storage',
    }
  )
)
