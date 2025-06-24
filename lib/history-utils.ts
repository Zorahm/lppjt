import { readDataFile, writeDataFile } from "./data-utils"

export async function addHistoryEntry(entry: {
  action: string
  section: string
  itemName: string
  user: string
  userRole: string
  details: string
}) {
  try {
    const { history = [] } = await readDataFile("history.json", { history: [] })

    const newEntry = {
      id: history.length > 0 ? Math.max(...history.map((h) => h.id)) + 1 : 1,
      timestamp: new Date().toISOString(),
      ...entry,
    }

    history.unshift(newEntry)

    // Ограничиваем историю последними 1000 записями
    if (history.length > 1000) {
      history.splice(1000)
    }

    await writeDataFile("history.json", { history })
  } catch (error) {
    console.error("Error adding history entry:", error)
  }
}

export async function getHistory() {
  try {
    const { history = [] } = await readDataFile("history.json", { history: [] })
    return history
  } catch (error) {
    console.error("Error getting history:", error)
    return []
  }
}

export async function logAction(
  action: string,
  section: string,
  itemName: string,
  user: string,
  userRole: string,
  details = "",
) {
  return addHistoryEntry({
    action,
    section,
    itemName,
    user,
    userRole,
    details,
  })
}

export async function addHistoryRecord(entry: {
  action: string
  section: string
  itemName: string
  user: string
  userRole: string
  details?: string
}) {
  return addHistoryEntry({
    action: entry.action,
    section: entry.section,
    itemName: entry.itemName,
    user: entry.user,
    userRole: entry.userRole,
    details: entry.details || "",
  })
}
