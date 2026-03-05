import "dotenv/config";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Tools from "./tools.js";


export class MCPServerDomain {
  private static instance: MCPServerDomain;

  constructor(private readonly server: McpServer) {
    this.inicialize();
  }

  static getInstance() {
     if (!MCPServerDomain.instance) {
       const client = new McpServer({
         name: "mcp-start-project",
         title: "NOTPADS MCP",
         description:
           "Com esse mcp terá dados sobre notpads e ferramentas para manipular os notpads",
         version: "1.0",
       });

       MCPServerDomain.instance = new MCPServerDomain(client);
     }

     return MCPServerDomain.instance;
  }

  private inicialize() {
    this.tools();
    this.resources();
  }

  private tools() {
    const toolsKeys = Object.keys(Tools);

    toolsKeys.forEach((toolKey) => {
      Tools[toolKey as keyof typeof Tools].forEach((tool) => {
        this.server.registerTool(tool.name, tool.options, tool.handler);
      });
    });
  }

  private resources() {}

  start() {
    const transport = new StdioServerTransport();

    this.server
      .connect(transport)
      .then(() => {
        console.log("Connected to MCP server");
      })
      .catch((error) => {
        console.error("Failed to connect to MCP server:", error);
      });
  }
}

const mcpServerDomain = MCPServerDomain.getInstance();

mcpServerDomain.start();
