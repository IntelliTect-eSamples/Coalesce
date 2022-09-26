using System;
using System.IO;
using Coalesce.Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Coalesce.Web.Vue
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost host = CreateWebHostBuilder(args).Build();

            // https://docs.microsoft.com/en-us/aspnet/core/migration/1x-to-2x/#move-database-initialization-code
            using (IServiceScope scope = host.Services.CreateScope())
            {
                IServiceProvider services = scope.ServiceProvider;

                try
                {
                    SampleData.Initialize(services.GetRequiredService<AppDbContext>());
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                    throw;
                }
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseWebRoot("wwwroot")
                .ConfigureLogging((context, builder) =>
                {
                    builder.AddConsole();
                    builder.AddDebug();
                })
                .UseStartup<Startup>();
        }
    }
}