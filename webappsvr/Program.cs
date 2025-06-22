using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();
app.UseStaticFiles();

// Optional: Serve files from a specific directory with a custom request path
// app.UseStaticFiles(new StaticFileOptions
// {
//     FileProvider = new PhysicalFileProvider(
//         Path.Combine(builder.Environment.ContentRootPath, "client/browser")),
//     RequestPath = ""  // Empty string means root path
// });

// Add this BEFORE UseStaticFiles to set default files
// app.UseDefaultFiles(new DefaultFilesOptions
// {
//     DefaultFileNames = new List<string> { "index.html" }
// });

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
// app.MapRazorPages()
//    .WithStaticAssets();
app.MapFallbackToFile("/index.html");

app.Run();
