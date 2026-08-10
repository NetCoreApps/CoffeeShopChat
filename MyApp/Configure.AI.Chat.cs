using ServiceStack.AI;

[assembly: HostingStartup(typeof(MyApp.ConfigureAiChat))]

namespace MyApp;

public class ConfigureAiChat : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services =>
        {
            services.AddPlugin(new ChatFeature
            {
                RequireAuth = true,
                AuthType = ChatAuthType.Credentials,
                Tools =
                {
                    EnableApiTools = true,
                },
                Mcp =
                {
                    ToolGroups = ["api_tools"],
                    RejectToolsRequiringApproval = false,
                },
            });

            services.ConfigurePlugin<MetadataFeature>(feature =>
                feature.AddPluginLink("/chat", "AI Coffee Shop"));
        });
}
