using System;
using System.Net.Http.Headers;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartAssistant
{
    public class Instrumentation
    {
        public string pingUrlBase { get; set; }
        public string pageLoadPingUrl { get; set; }
    }

    public class ThumbnailBing
    {
        public string contentUrl { get; set; }
        public int width { get; set; }
        public int height { get; set; }
    }

    public class ImageBing
    {
        public ThumbnailBing thumbnail { get; set; }
    }

    public class AboutBing
    {
        public string readLink { get; set; }
        public string name { get; set; }
    }

    public class ProviderBing
    {
        public string _type { get; set; }
        public string name { get; set; }
    }

    public class ValueBing
    {
        public string name { get; set; }
        public string url { get; set; }
        public string urlPingSuffix { get; set; }
        public ImageBing image { get; set; }
        public string description { get; set; }
        public List<AboutBing> about { get; set; }
        public List<ProviderBing> provider { get; set; }
        public string datePublished { get; set; }
        public string category { get; set; }
    }

    public class BingNewsResult
    {
        public string _type { get; set; }
        public Instrumentation instrumentation { get; set; }
        public string readLink { get; set; }
        public int totalEstimatedMatches { get; set; }
        public List<ValueBing> value { get; set; }
    }
    public class BingNewsHelper
    {
        public static async Task<BingNewsResult> Search(string Qry)
        {
            var client = new HttpClient();
           
            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", APPCONTANTS.BING_API_KEY);

            var uri = string.Format("https://api.cognitive.microsoft.com/bing/v5.0/news/search?q={0}&count={1}&offset={2}&mkt={3}&safeSearch={4}",Qry,3,0,"en-us","Moderate");

            var response = await client.GetAsync(uri);
            var msg = await response.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(msg))
            {
                var hasil = JsonConvert.DeserializeObject<BingNewsResult>(msg);
                return hasil;
            }
            return null;
        }
    }
}

