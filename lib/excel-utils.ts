import * as XLSX from "xlsx"

export interface ExcelScheduleData {
  title: string
  year: number
  month: number
  department: string
  shiftInfo: {
    dayShift: string
    nightShift: string
    shiftDuration: string
  }
  workingHoursNorm: {
    day: number
    shift: number
  }
  employees: Array<{
    id: number
    name: string
    position: string
    shifts: { [day: number]: string }
    notes: string
    totalHours: number
    overtime: number
  }>
}

export interface ParsedExcelResult {
  success: boolean
  data?: ExcelScheduleData
  errors: string[]
  warnings: string[]
}

// Маппинг типов смен из Excel в систему
const SHIFT_MAPPING: { [key: string]: string } = {
  В: "В",
  в: "В",
  вых: "В",
  выходной: "В",
  "8": "8",
  "8.0": "8",
  "12": "12",
  "12.0": "12",
  "4": "4",
  "4.0": "4",
  "7.5": "7.5",
  "11.5": "11.5",
  "15.5": "15.5",
  от: "от",
  отп: "от",
  отпуск: "от",
  б: "б",
  больн: "б",
  больничный: "б",
}

// Нормализация значения смены
function normalizeShift(value: any): string {
  if (value === null || value === undefined || value === "") {
    return "В"
  }

  const strValue = String(value).trim().toLowerCase()
  return SHIFT_MAPPING[strValue] || strValue
}

// Извлечение месяца и года из заголовка
function extractDateFromTitle(title: string): { month: number; year: number } | null {
  // Ищем паттерн "МЕСЯЦ YYYY" или "на МЕСЯЦ YYYY"
  const monthNames = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ]

  const lowerTitle = title.toLowerCase()
  let month = -1
  let year = -1

  // Ищем месяц
  for (let i = 0; i < monthNames.length; i++) {
    if (lowerTitle.includes(monthNames[i])) {
      month = i + 1
      break
    }
  }

  // Ищем год (4 цифры)
  const yearMatch = title.match(/(\d{4})/g)
  if (yearMatch) {
    year = Number.parseInt(yearMatch[yearMatch.length - 1])
  }

  if (month > 0 && year > 0) {
    return { month, year }
  }

  return null
}

// Поиск строки с заголовком таблицы (содержит "Ф.И.О" или "№")
function findHeaderRow(worksheet: XLSX.WorkSheet): number {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:A1")

  for (let row = range.s.r; row <= Math.min(range.e.r, 20); row++) {
    for (let col = range.s.c; col <= Math.min(range.e.c, 10); col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
      const cell = worksheet[cellAddress]

      if (cell && cell.v) {
        const cellValue = String(cell.v).toLowerCase()
        if (
          cellValue.includes("ф.и.о") ||
          cellValue.includes("фио") ||
          (cellValue.includes("№") && cellValue.length < 5)
        ) {
          return row
        }
      }
    }
  }

  return -1
}

// Поиск колонки с именами сотрудников
function findNameColumn(worksheet: XLSX.WorkSheet, headerRow: number): number {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:A1")

  for (let col = range.s.c; col <= Math.min(range.e.c, 10); col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col })
    const cell = worksheet[cellAddress]

    if (cell && cell.v) {
      const cellValue = String(cell.v).toLowerCase()
      if (cellValue.includes("ф.и.о") || cellValue.includes("фио")) {
        return col
      }
    }
  }

  return 1 // По умолчанию вторая колонка (после №)
}

// Поиск колонки с должностями
function findPositionColumn(worksheet: XLSX.WorkSheet, headerRow: number): number {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:A1")

  for (let col = range.s.c; col <= Math.min(range.e.c, 10); col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col })
    const cell = worksheet[cellAddress]

    if (cell && cell.v) {
      const cellValue = String(cell.v).toLowerCase()
      if (cellValue.includes("проф") || cellValue.includes("должн") || cellValue.includes("специальность")) {
        return col
      }
    }
  }

  return 2 // По умолчанию третья колонка
}

// Поиск диапазона колонок с днями месяца
function findDayColumns(worksheet: XLSX.WorkSheet, headerRow: number): { start: number; end: number } {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:A1")
  let start = -1
  let end = -1

  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col })
    const cell = worksheet[cellAddress]

    if (cell && cell.v) {
      const cellValue = String(cell.v).trim()
      const dayNumber = Number.parseInt(cellValue)

      if (!isNaN(dayNumber) && dayNumber >= 1 && dayNumber <= 31) {
        if (start === -1) {
          start = col
        }
        end = col
      }
    }
  }

  return { start, end }
}

// Извлечение информации о нормах часов
function extractWorkingHoursNorm(worksheet: XLSX.WorkSheet): { day: number; shift: number } {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:A1")
  let dayNorm = 160
  let shiftNorm = 160

  // Ищем строки с "Норма часов" или "151"
  for (let row = range.s.r; row <= Math.min(range.e.r, 30); row++) {
    for (let col = range.s.c; col <= Math.min(range.e.c, 50); col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
      const cell = worksheet[cellAddress]

      if (cell && cell.v) {
        const cellValue = String(cell.v).toLowerCase()

        if (cellValue.includes("норма") && cellValue.includes("час")) {
          // Ищем числа в соседних ячейках
          for (let nextCol = col + 1; nextCol <= Math.min(col + 5, range.e.c); nextCol++) {
            const nextCellAddress = XLSX.utils.encode_cell({ r: row, c: nextCol })
            const nextCell = worksheet[nextCellAddress]

            if (nextCell && nextCell.v) {
              const value = Number.parseInt(String(nextCell.v))
              if (!isNaN(value) && value > 100 && value < 300) {
                if (cellValue.includes("дневн")) {
                  dayNorm = value
                } else if (cellValue.includes("смен")) {
                  shiftNorm = value
                } else {
                  dayNorm = value
                  shiftNorm = value
                }
              }
            }
          }
        }

        // Прямой поиск числа 151 или подобных
        const value = Number.parseInt(String(cell.v))
        if (!isNaN(value) && value > 100 && value < 300) {
          // Проверяем контекст
          const contextCells = []
          for (let contextCol = Math.max(0, col - 2); contextCol <= Math.min(range.e.c, col + 2); contextCol++) {
            const contextAddress = XLSX.utils.encode_cell({ r: row, c: contextCol })
            const contextCell = worksheet[contextAddress]
            if (contextCell && contextCell.v) {
              contextCells.push(String(contextCell.v).toLowerCase())
            }
          }

          const context = contextCells.join(" ")
          if (context.includes("дневн")) {
            dayNorm = value
          } else if (context.includes("смен")) {
            shiftNorm = value
          } else if (context.includes("норма") || context.includes("час")) {
            dayNorm = value
            shiftNorm = value
          }
        }
      }
    }
  }

  return { day: dayNorm, shift: shiftNorm }
}

export async function parseExcelSchedule(file: File): Promise<ParsedExcelResult> {
  const errors: string[] = []
  const warnings: string[] = []

  try {
    // Читаем файл
    const arrayBuffer = await file.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: "array" })

    if (workbook.SheetNames.length === 0) {
      return {
        success: false,
        errors: ["Файл не содержит листов"],
        warnings: [],
      }
    }

    // Берем первый лист
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:A1")

    // Извлекаем заголовок и дату
    let title = ""
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let department = ""

    // Ищем заголовок в первых строках
    for (let row = range.s.r; row <= Math.min(range.e.r, 10); row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
        const cell = worksheet[cellAddress]

        if (cell && cell.v) {
          const cellValue = String(cell.v).trim()

          // Ищем заголовок с датой
          if (
            cellValue.toLowerCase().includes("на ") &&
            (cellValue.includes("2024") || cellValue.includes("2025") || cellValue.includes("2026"))
          ) {
            title = cellValue
            const dateInfo = extractDateFromTitle(cellValue)
            if (dateInfo) {
              month = dateInfo.month
              year = dateInfo.year
            }
          }

          // Ищем название подразделения
          if (
            cellValue.toLowerCase().includes("участок") ||
            cellValue.toLowerCase().includes("подразделение") ||
            cellValue.toLowerCase().includes("отдел")
          ) {
            department = cellValue
          }
        }
      }
    }

    if (!title) {
      title = `График на ${month}/${year}`
    }

    // Находим строку с заголовками таблицы
    const headerRow = findHeaderRow(worksheet)
    if (headerRow === -1) {
      return {
        success: false,
        errors: ['Не найдена строка с заголовками таблицы (должна содержать "Ф.И.О" или "№")'],
        warnings: [],
      }
    }

    // Находим колонки
    const nameColumn = findNameColumn(worksheet, headerRow)
    const positionColumn = findPositionColumn(worksheet, headerRow)
    const dayColumns = findDayColumns(worksheet, headerRow)

    if (dayColumns.start === -1 || dayColumns.end === -1) {
      return {
        success: false,
        errors: ["Не найдены колонки с днями месяца"],
        warnings: [],
      }
    }

    // Извлекаем нормы часов
    const workingHoursNorm = extractWorkingHoursNorm(worksheet)

    // Парсим данные сотрудников
    const employees: ExcelScheduleData["employees"] = []

    for (let row = headerRow + 1; row <= range.e.r; row++) {
      // Получаем имя сотрудника
      const nameCell = worksheet[XLSX.utils.encode_cell({ r: row, c: nameColumn })]
      if (!nameCell || !nameCell.v) continue

      const name = String(nameCell.v).trim()
      if (!name || name.length < 2) continue

      // Получаем должность
      const positionCell = worksheet[XLSX.utils.encode_cell({ r: row, c: positionColumn })]
      const position = positionCell && positionCell.v ? String(positionCell.v).trim() : "Сотрудник"

      // Получаем смены по дням
      const shifts: { [day: number]: string } = {}
      let totalHours = 0

      for (let col = dayColumns.start; col <= dayColumns.end; col++) {
        const dayCell = worksheet[XLSX.utils.encode_cell({ r: headerRow, c: col })]
        if (!dayCell || !dayCell.v) continue

        const day = Number.parseInt(String(dayCell.v))
        if (isNaN(day) || day < 1 || day > 31) continue

        const shiftCell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })]
        const shiftValue = shiftCell && shiftCell.v ? normalizeShift(shiftCell.v) : "В"

        shifts[day] = shiftValue

        // Подсчитываем часы
        const hours = Number.parseFloat(shiftValue)
        if (!isNaN(hours)) {
          totalHours += hours
        } else if (shiftValue === "8") {
          totalHours += 8
        } else if (shiftValue === "12") {
          totalHours += 12
        } else if (shiftValue === "4") {
          totalHours += 4
        } else if (shiftValue === "7.5") {
          totalHours += 7.5
        } else if (shiftValue === "11.5") {
          totalHours += 11.5
        } else if (shiftValue === "15.5") {
          totalHours += 15.5
        }
      }

      // Ищем колонку с примечаниями
      let notes = ""
      for (let col = dayColumns.end + 1; col <= Math.min(dayColumns.end + 5, range.e.c); col++) {
        const headerCell = worksheet[XLSX.utils.encode_cell({ r: headerRow, c: col })]
        if (headerCell && headerCell.v) {
          const headerValue = String(headerCell.v).toLowerCase()
          if (headerValue.includes("примеч") || headerValue.includes("заметк")) {
            const notesCell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })]
            if (notesCell && notesCell.v) {
              notes = String(notesCell.v).trim()
            }
            break
          }
        }
      }

      // Определяем норму часов для сотрудника (по должности)
      const employeeNorm = position.toLowerCase().includes("смен") ? workingHoursNorm.shift : workingHoursNorm.day
      const overtime = Math.max(0, totalHours - employeeNorm)

      employees.push({
        id: Date.now() + Math.random(), // Временный ID
        name,
        position,
        shifts,
        notes,
        totalHours,
        overtime,
      })
    }

    if (employees.length === 0) {
      return {
        success: false,
        errors: ["Не найдено ни одного сотрудника в таблице"],
        warnings: [],
      }
    }

    // Проверяем предупреждения
    if (!department) {
      warnings.push("Не найдено название подразделения")
    }

    const result: ExcelScheduleData = {
      title,
      year,
      month,
      department,
      shiftInfo: {
        dayShift: "Дневная смена",
        nightShift: "Ночная смена",
        shiftDuration: "11 часов 30 минут",
      },
      workingHoursNorm,
      employees,
    }

    return {
      success: true,
      data: result,
      errors: [],
      warnings,
    }
  } catch (error) {
    console.error("Error parsing Excel file:", error)
    return {
      success: false,
      errors: [`Ошибка при обработке файла: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`],
      warnings: [],
    }
  }
}
