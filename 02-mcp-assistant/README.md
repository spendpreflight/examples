# Claude Code and Cursor

Run `npm run example:mcp` from the repository root to validate both files and print the prompt offline.

For Claude Code, copy `claude.mcp.json` to `.mcp.json` in your own project, merging with existing entries. For Cursor, copy `cursor.mcp.json` to `.cursor/mcp.json`, also preserving existing configuration. Review and approve the remote connection in your client, then paste `prompt.txt`. Do not overwrite unrelated servers.

These configurations connect to the existing Streamable HTTP endpoint. They do not contain credentials, enable wallet payments or grant blanket tool approval. Review calls before execution: a tool call can consume a shared trial or perform a public Lint probe. Paid tools return x402 requirements after applicable allowances; generic MCP clients need an explicitly configured payment-capable client to settle them. Stop at a fee challenge unless separately authorized.

Start directly with `preflight_payment` for an actual payment. Use `get_service_info` for the grouped catalog when needed; there is no new list_more_tools tool. All existing enabled tools remain callable.

Configuration references: [Claude Code MCP](https://code.claude.com/docs/en/mcp), [Cursor MCP](https://cursor.com/docs/mcp). Claude Desktop uses its own remote-connector UI; this `.mcp.json` file is specifically for Claude Code.
