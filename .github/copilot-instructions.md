# Copilot Instructions for Weather MCP Server

## Project Overview
This is a **Model Context Protocol (MCP) server** implementation for weather-related functionality. MCP is a standard protocol enabling AI tools to safely interact with external systems. The server uses TypeScript with the official `@modelcontextprotocol/sdk`.

## Key Architecture Patterns

### MCP Server Structure
- **Server instantiation**: Use `McpServer` from the SDK to create the server instance
- **Tool/resource registration**: Tools and resources are registered on the server instance
- **Zod validation**: All handler inputs must be validated using Zod schemas (already installed)
- **Handler pattern**: Implement handlers as async functions that receive validated inputs

### Type Safety
- TypeScript strict mode with `@types/node` for Node.js APIs
- All external inputs validated with Zod before processing
- No `any` types - use explicit TypeScript types or infer from Zod schemas

## Development Workflow

### Build & Run
```bash
# Compile TypeScript to JavaScript
npx tsc

# Run the compiled server (after tsc)
node server.js
```

### Dependencies
- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `zod`: Runtime schema validation for type safety
- `typescript`, `@types/node`: Development dependencies only

## Coding Conventions

### File Organization
- Single `server.ts` file for server setup and handlers
- Keep handler definitions close to server initialization
- Extract complex business logic into separate files only if they exceed 300 lines

### MCP Handler Pattern
```typescript
server.setRequestHandler(Tool, async (request) => {
  // Validate with Zod
  const params = YourSchema.parse(request.params);
  // Process request
  return { content: [/* MCP Content objects */] };
});
```

### Error Handling
- Throw errors in handlers; MCP SDK converts them to proper error responses
- Use descriptive error messages that reference which validation failed
- Return structured error content objects when appropriate

## Key Files & Responsibilities

- **[server.ts](../server.ts)**: Main server file - contains server initialization, tool definitions, and request handlers
- **[package.json](../package.json)**: Project metadata and exact dependency versions

## Common Tasks

**Adding a new tool**: 
1. Define input schema with Zod in server.ts
2. Register handler with `server.setRequestHandler(Tool, ...)`
3. Return content with proper MCP ContentBlock structure

**Debugging**: 
- Enable debug logs by checking SDK documentation
- Test handlers locally before deployment

## Integration Points

- **MCP Client**: Any AI tool or agent using MCP protocol (Claude, custom clients)
- **External APIs**: Weather data sources should be integrated as separate modules
- **Protocol compliance**: All responses must follow MCP specification for Content and ContentBlock types
