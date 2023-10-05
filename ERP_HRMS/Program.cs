using BusinessModel;
using DataAccess;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();


var services = builder.Services;
//services.AddTransient<IUploadNewEmployeePhotoImages, UploadNewEmployeePhotoImageDataAccess>();
services.Configure<AzureStorageAccountsOptions>(builder.Configuration.GetSection("Azure"));

var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.MapRazorPages();
app.MapDefaultControllerRoute();

app.MapControllerRoute(
	name: "default",
//pattern: "{controller=AllEmployee}/{action=AllEmployeeMainPage}/{id?}");
pattern: "{controller=Signin}/{action=LoginWindow}/{id?}");

app.Run();
