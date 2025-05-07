# Etapa 1: Build da aplicação
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copia os arquivos do projeto e restaura dependências
COPY ./backend/*.csproj ./
RUN dotnet restore

# Copia o restante do código
COPY ./backend/. ./
RUN dotnet publish -c Release -o /publish

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Define a variável de ambiente para escutar na porta 5000
ENV ASPNETCORE_URLS=http://+:5000

COPY --from=build /publish .

EXPOSE 5000

ENTRYPOINT ["dotnet", "api.dll"]
