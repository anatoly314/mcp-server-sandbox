import { ReadResourceResult, McpError } from '@modelcontextprotocol/sdk/types.js';

export interface ResourceDefinition {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

export interface ResourceImplementation {
  definition: ResourceDefinition;
  read(uri: string): Promise<ReadResourceResult>;
  subscribe?(uri: string): Promise<void>; // Optional for future real-time updates
}

export abstract class BaseResource implements ResourceImplementation {
  abstract definition: ResourceDefinition;
  abstract read(uri: string): Promise<ReadResourceResult>;
  
  protected createTextContent(uri: string, text: string, mimeType?: string): ReadResourceResult {
    return {
      contents: [
        {
          uri,
          mimeType: mimeType || this.definition.mimeType,
          text
        }
      ]
    };
  }
  
  protected createBlobContent(uri: string, blob: string, mimeType?: string): ReadResourceResult {
    return {
      contents: [
        {
          uri,
          mimeType: mimeType || this.definition.mimeType,
          blob
        }
      ]
    };
  }
}