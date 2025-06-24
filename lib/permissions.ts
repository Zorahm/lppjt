// Серверная версия модуля permissions
import { ROLES } from "@/app/api/roles/route"

export function hasPermission(userRole: string, permission: string): boolean {
  const role = ROLES[userRole as keyof typeof ROLES]
  return role ? role.permissions.includes(permission) : false
}

export function hasVacationPermission(userRole: string, permission: string): boolean {
  const role = ROLES[userRole as keyof typeof ROLES]
  if (!role) return false

  return role.permissions.includes(permission)
}

export function canManageVacations(userRole: string): boolean {
  return hasVacationPermission(userRole, "manage_vacations")
}

export function canApproveVacations(userRole: string): boolean {
  return hasVacationPermission(userRole, "approve_vacations")
}

export function canViewAllVacations(userRole: string): boolean {
  return hasVacationPermission(userRole, "view_vacations")
}

export function canViewOwnVacations(userRole: string): boolean {
  return hasVacationPermission(userRole, "view_own_vacations")
}

export function canManageSection(userRole: string, userId: string, sectionId?: number, managerId?: number): boolean {
  // Администраторы могут управлять всеми участками
  if (userRole === "admin") return true

  // Менеджеры участков могут управлять только своими участками
  if (userRole === "section_manager" && managerId && userId === managerId.toString()) {
    return true
  }

  return false
}

export function canViewSection(
  userRole: string,
  userId: string,
  sectionId?: number,
  employeeSectionId?: number,
): boolean {
  // Администраторы и HR могут просматривать все участки
  if (["admin", "hr"].includes(userRole)) return true

  // Сотрудники могут просматривать информацию о своем участке
  if (sectionId && employeeSectionId && sectionId === employeeSectionId) return true

  return false
}

export function getRoleDisplayName(role: string): string {
  const roleData = ROLES[role as keyof typeof ROLES]
  return roleData ? roleData.name : role
}

export function getRolePermissions(role: string): string[] {
  const roleData = ROLES[role as keyof typeof ROLES]
  return roleData ? roleData.permissions : []
}
