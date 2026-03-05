import { z } from "zod";

export interface RegisterToolDto {
  name: string;
  options: {
    title: string;
    description: string;
    inputSchema?: z.ZodObject<any>;
  };
  handler:  (
    args: Record<string, unknown>,
    extra: any
  ) => Promise<any> | any;
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type RegisterToolParams = Parameters<McpServer["registerTool"]>;

export type RegisterToolDto2 = {
  name: RegisterToolParams[0];
  options: RegisterToolParams[1];
  handler: RegisterToolParams[2];
};
