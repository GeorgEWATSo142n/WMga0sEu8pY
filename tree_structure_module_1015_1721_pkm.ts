// 代码生成时间: 2025-10-15 17:21:57
import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';

@Module({
  providers: [TreeService],
  controllers: [TreeController],
})
export class TreeStructureModule {}

/*
 * Tree Service
 * This service manages the tree structure. It includes methods for adding and removing nodes,
 * as well as for traversing the tree.
 */
import { Injectable } from '@nestjs/common';
import { TreeNode } from './tree-node.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TreeService {
  constructor(
    @InjectRepository(TreeNode)
    private treeNodeRepository: Repository<TreeNode>,
  ) {}

  /*
   * Create a new tree node with the given data.
   * @param data - The data to be stored in the new node.
   * @returns The created tree node.
   */
  async createNode(data: any): Promise<TreeNode> {
    const newNode = this.treeNodeRepository.create(data);
    return this.treeNodeRepository.save(newNode);
  }

  /*
   * Remove a tree node by its id.
   * @param id - The id of the node to be removed.
   * @returns A promise that resolves when the node is removed.
   */
  async removeNode(id: number): Promise<void> {
    await this.treeNodeRepository.delete(id);
  }

  /*
   * Traverse the tree using a depth-first search algorithm.
   * @returns An array of tree nodes in the order they were visited.
   */
  async traverseTree(): Promise<TreeNode[]> {
    return this.treeNodeRepository.find({ relations: ['children'] });
  }
}

/*
 * Tree Controller
 * This controller exposes the endpoints for interacting with the tree structure.
 * It handles requests for creating, removing, and traversing tree nodes.
 */
import { Controller, Post, Delete, Get } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeNode } from './tree-node.entity';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  /*
   * Create a new tree node.
   * @param data - The data for the new node.
   * @returns The created tree node.
   */
  @Post()
  async create(@Body() data: any): Promise<TreeNode> {
    try {
      return await this.treeService.createNode(data);
    } catch (error) {
      // Error handling
      throw new Error('Failed to create node: ' + error.message);
    }
  }

  /*
   * Remove a tree node by its id.
   * @param id - The id of the node to be removed.
   * @returns A promise that resolves when the node is removed.
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.treeService.removeNode(parseInt(id));
    } catch (error) {
      // Error handling
      throw new Error('Failed to remove node: ' + error.message);
    }
  }

  /*
   * Traverse the tree and return the nodes in the order they were visited.
   * @returns An array of tree nodes.
   */
  @Get()
  async traverse(): Promise<TreeNode[]> {
    try {
      return await this.treeService.traverseTree();
    } catch (error) {
      // Error handling
      throw new Error('Failed to traverse tree: ' + error.message);
    }
  }
}

/*
 * Tree Node Entity
 * This entity represents a node in the tree structure.
 * It includes properties for storing the node's data and its children.
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TreeNode } from './tree-node.entity';

@Entity()
export class TreeNode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: any;

  @OneToMany(() => TreeNode, node => node.parent)
  children: TreeNode[];

  @Column()
  parent: TreeNode;
}
