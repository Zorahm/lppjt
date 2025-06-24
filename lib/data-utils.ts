// Этот файл будет использоваться только на сервере
import { promises as fs } from "fs"
import path from "path"

// Путь к директории с данными
const DATA_DIR = path.join(process.cwd(), "data")

// Функция для генерации уникального ID
export function generateId(): string {
  return Date.now().toString()
}

// Функция для чтения данных из файла
export async function readDataFile<T>(fileName: string, defaultData: T): Promise<T> {
  try {
    // Создаем директорию, если она не существует
    await fs.mkdir(DATA_DIR, { recursive: true })

    const filePath = path.join(DATA_DIR, fileName)

    try {
      const fileData = await fs.readFile(filePath, "utf8")
      return JSON.parse(fileData) as T
    } catch (error) {
      // Если файл не существует или произошла ошибка чтения,
      // создаем файл с данными по умолчанию
      await writeDataFile(fileName, defaultData)
      return defaultData
    }
  } catch (error) {
    console.error(`Ошибка при чтении файла ${fileName}:`, error)
    return defaultData
  }
}

// Функция для записи данных в файл
export async function writeDataFile<T>(fileName: string, data: T): Promise<void> {
  try {
    // Создаем директорию, если она не существует
    await fs.mkdir(DATA_DIR, { recursive: true })

    const filePath = path.join(DATA_DIR, fileName)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
  } catch (error) {
    console.error(`Ошибка при записи в файл ${fileName}:`, error)
    throw error
  }
}
