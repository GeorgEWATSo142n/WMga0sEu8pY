// 代码生成时间: 2025-10-17 15:15:47
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  /*
   * Constructor to create new user instance
   */
  constructor(id: string, name: string, email: string, bio?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.bio = bio;
  }
}

@ObjectType()
export class Error {
  @Field()
  message: string;

  @Field({ nullable: true })
  error?: string;

  /*
   * Constructor to create new error instance
   */
  constructor(message: string, error?: string) {
    this.message = message;
    this.error = error;
  }
}

/*
 * Utility interface to represent a GraphQL query response
 */
export interface QueryResponse<T> {
  data?: T;
  error?: Error;
}

/*
 * Utility interface to represent a GraphQL mutation response
 */
export interface MutationResponse<T> {
  data?: T;
  errors?: Error[];
}

/*
 * This module provides a clear structure for data models,
 * with proper error handling and documentation,
 * following TypeScript best practices for maintainability and scalability.
 * It ensures that the code is easy to understand and extend.
 */