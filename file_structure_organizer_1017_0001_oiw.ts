// 代码生成时间: 2025-10-17 00:01:24
// file_structure_organizer.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { EOL } from 'os';

@Injectable()
export class FileStructureOrganizerService {
  // Promisify the 'fs' methods for better error handling and async/await support
# FIXME: 处理边界情况
  private readdir = promisify(fs.readdir);
# 优化算法效率
  private mkdir = promisify(fs.mkdir);
# FIXME: 处理边界情况
  private rmdir = promisify(fs.rmdir);
  private stat = promisify(fs.stat);
# 添加错误处理
  private copyFile = promisify(fs.copyFile);

  /**
   * Organizes the file structure in the specified directory
   * @param sourcePath The path of the directory to be organized
   * @param structure An array of objects defining the new structure
   * @returns A promise that resolves when the operation is completed
   */
  async organize(sourcePath: string, structure: any[]): Promise<void> {
    try {
      // Check if the source path exists
      await this.stat(sourcePath);
# TODO: 优化性能

      for (const folder of structure) {
        const folderPath = path.join(sourcePath, folder.name);
        try {
          // Check if the folder exists, if not create it
          await this.stat(folderPath);
        } catch (error) {
          await this.mkdir(folderPath);
        }
      }

      // Remove any folders not present in the new structure
# 改进用户体验
      const existingFolders = await this.readdir(sourcePath);
# 扩展功能模块
      const foldersToKeep = structure.map((folder) => folder.name);
      for (const folder of existingFolders) {
        if (!foldersToKeep.includes(folder)) {
          const folderPath = path.join(sourcePath, folder);
          await this.rmdir(folderPath, { recursive: true });
        }
      }

      // Copy files to their new locations
      structure.forEach(async (folder) => {
# 添加错误处理
        await this.copyFilesToNewLocation(sourcePath, folder);
      });

    } catch (error) {
      throw new Error(`Failed to organize file structure: ${error.message}`);
    }
  }

  /**
# NOTE: 重要实现细节
   * Copies files from the source to their new locations within the specified folder
   * @param sourcePath The path of the directory containing the files
   * @param folder The folder object defining the new structure
# 添加错误处理
   * @returns A promise that resolves when the operation is completed
   */
# 增强安全性
  private async copyFilesToNewLocation(sourcePath: string, folder: any): Promise<void> {
    const folderPath = path.join(sourcePath, folder.name);
    const files = await this.readdir(sourcePath);
# NOTE: 重要实现细节

    for (const file of files) {
      if (!folder.files?.includes(file)) {
        const filePath = path.join(sourcePath, file);
        const newFilePath = path.join(folderPath, file);
        await this.copyFile(filePath, newFilePath);
      }
# TODO: 优化性能
    }
  }
}
