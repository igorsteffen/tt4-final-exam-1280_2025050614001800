using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Adiciona o DbContext com SQLite
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=contacts.db"));

// Ativa os controllers
builder.Services.AddControllers();

// Swagger/OpenAPI (opcional)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Habilita CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Garante que o banco e as tabelas serão criados
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Usa CORS
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



//app.UseHttpsRedirection();

app.UseAuthorization();

// Usa os controllers com rotas padrão
app.MapControllers();

app.Run();

