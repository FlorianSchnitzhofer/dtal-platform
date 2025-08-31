# Digital Twin Platform UI

This is a code bundle for Digital Twin Platform UI.

## Running the code

Run `npm i` to install the dependencies.
Run `npm run dev` to start the development server.

## Docker

Build the container image:
```bash
docker build -t dtal-platform .
```
Run the container locally:
```bash
docker run -p 8080:80 dtal-platform
```

## Deploying to Azure Web App Service

1. Push the image to a registry such as [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/).
2. Create an Azure Web App for Containers and configure it to use the pushed image.

The container listens on port 80 and serves the built static site via Nginx.
