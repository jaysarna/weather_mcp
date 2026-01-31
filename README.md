# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information for various cities.

## Overview

This is a TypeScript-based MCP server that implements weather-related tools and resources. It enables AI agents and tools compatible with the MCP protocol to access weather data in a standardized way.

## Features

- **get_weather tool**: Retrieve current weather conditions for supported cities
- **weather://cities resource**: List of supported cities with available weather data

## Supported Cities

- London (22° C, Sunny)
- Paris (25° C, Cloudy)

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Development

### Build

```bash
# Compile TypeScript to JavaScript
npx tsc
```

### Run

```bash
# Execute the server
node server.js
```

Or use tsx for direct execution:

```bash
npx tsx server.ts
```

## Project Structure

```
.
├── server.ts              # Main server implementation with tools and resources
├── package.json           # Project dependencies and metadata
├── package-lock.json      # Locked dependency versions
├── .gitignore            # Git ignore rules
└── .github/
    └── copilot-instructions.md  # AI agent development guidelines
```

## Architecture

This project follows the MCP server architecture:

- **Server Setup**: Uses `McpServer` from the official MCP SDK
- **Tool Registration**: Weather tools defined with Zod input validation
- **Resource Management**: Static resources listing available weather data
- **Type Safety**: Full TypeScript with strict mode

## API Reference

### Tools

#### get_weather

Retrieves current weather for a specified city.

**Input Schema:**
```typescript
{
  city: string  // City name (e.g., "London", "Paris")
}
```

**Response:**
```json
{
  "temp": "22° C",
  "conditions": "Sunny"
}
```

### Resources

#### weather://cities

Returns a list of supported cities for weather queries.

## Configuration

All configuration is in `package.json`. The server uses:
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `zod` - Runtime schema validation
- `typescript` - Type safety and compilation

## Development Guidelines

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed instructions for AI agents and developers working on this project.

## Contributing

When adding new tools:
1. Define the input schema with Zod
2. Register the handler with proper MCP ContentBlock structure
3. Update this README with new features

## License

ISC
