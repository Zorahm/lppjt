// Клиентская версия модуля permissions
// Роли и их разрешения (синхронизировано с серверной версией)
const ROLES = {
  admin: {
    name: "Администратор",
    permissions: [
      "users:read",
      "users:write",
      "users:delete",
      "sections:read",
      "sections:write",
      "sections:delete",
      "employees:read",
      "employees:write",
      "employees:delete",
      "vacancies:read",
      "vacancies:write",
      "vacancies:delete",
      "schedules:read",
      "schedules:write",
      "schedules:delete",
      "roles:read",
      "roles:write",
      "history:read",
      "analytics:read",
      "manage_vacations",
      "approve_vacations",
      "view_vacations",
      "view_own_vacations",
    ],
  },
  hr: {
    name: "HR менеджер",
    permissions: [
      "sections:read",
      "sections:write",
      "employees:read",
      "employees:write",
      "vacancies:read",
      "vacancies:write",
      "schedules:read",
      "schedules:write",
      "analytics:read",
      "manage_vacations",
      "approve_vacations",
      "view_vacations",
    ],
  },
  section_manager: {
    name: "Менеджер участка",
    permissions: [
      "sections:read",
      "employees:read",
      "vacancies:read",
      "vacancies:write",
      "schedules:read",
      "schedules:write",
      "approve_vacations",
      "view_vacations",
      "view_own_vacations",
    ],
  },
  employee: {
    name: "Сотрудник",
    permissions: ["schedules:read", "vacancies:read", "view_own_vacations"],
  },
}

export function hasPermission(userRole: string, resource: string, action: string): boolean {
  console.log(`Проверка прав: роль=${userRole}, ресурс=${resource}, действие=${action}`)

  const role = ROLES[userRole as keyof typeof ROLES]
  if (!role) {
    console.log(`Роль ${userRole} не найдена`)
    return false
  }

  const permission = `${resource}:${action}`
  const hasAccess = role.permissions.includes(permission)

  console.log(`Права роли ${userRole}:`, role.permissions)
  console.log(`Требуемое право: ${permission}`)
  console.log(`Доступ: ${hasAccess}`)

  return hasAccess
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
