import { FileStorage } from "../core/FileStorage";

export class FileStorageFactory {
  static async create(): Promise<FileStorage> {
    return new FileStorage('.datastory')
  }
}