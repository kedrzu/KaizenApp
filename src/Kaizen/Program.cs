using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Kaizen
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            Process.Start("cmd.exe", "/C webpack --watch");

            host.Run();
        }
    }
}
