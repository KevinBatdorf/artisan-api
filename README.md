# Laravel Artisan Command API
An API to search Laravel Artisan commands by version or keyword.
## Endpoints
List available versions ([Try it](https://laravel-docs-api.vercel.app/api/versions))
```
GET /api/versions
```
List all commands ([Try it](https://laravel-docs-api.vercel.app/api/commands))
```
GET /api/commands
```
Search for a command ([Try it](https://laravel-docs-api.vercel.app/api/commands?s=migrate))
```
GET /api/commands?s=database
```
Specify a version ([Try it](https://laravel-docs-api.vercel.app/api/commands?s=migrate&v=8.x))
```
GET /api/commands?v=8.x
