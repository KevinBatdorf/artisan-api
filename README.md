# Laravel Artisan Command API
An API to search Laravel Artisan commands by version or keyword.
## Endpoints
List available versions:
```
GET /api/versions
```
List all commands:
```
GET /api/commands
```
Search for a command:
```
GET /api/commands?s=database
```
Specify a version:
```
GET /api/commands?v=8.x
