using System;
using System.Net.Http.Headers;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartAssistant
{

    public class InstrumentationBingVideo
    {
        public string pageLoadPingUrl { get; set; }
    }

    public class PublisherBingVideo
    {
        public string name { get; set; }
    }

    public class CreatorBingVideo
    {
        public string name { get; set; }
    }

    public class ThumbnailBingVideo
    {
        public int width { get; set; }
        public int height { get; set; }
    }

    public class ValueBingVideo
    {
        public string name { get; set; }
        public string description { get; set; }
        public string webSearchUrl { get; set; }
        public string thumbnailUrl { get; set; }
        public string datePublished { get; set; }
        public List<PublisherBingVideo> publisher { get; set; }
        public CreatorBingVideo creator { get; set; }
        public string contentUrl { get; set; }
        public string hostPageUrl { get; set; }
        public string encodingFormat { get; set; }
        public string hostPageDisplayUrl { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public string duration { get; set; }
        public string motionThumbnailUrl { get; set; }
        public string embedHtml { get; set; }
        public bool allowHttpsEmbed { get; set; }
        public int viewCount { get; set; }
        public ThumbnailBingVideo thumbnail { get; set; }
        public string videoId { get; set; }
        public bool allowMobileEmbed { get; set; }
    }

    public class Thumbnail2BingVideo
    {
        public string thumbnailUrl { get; set; }
    }

    public class QueryExpansionBingVideo
    {
        public string text { get; set; }
        public string displayText { get; set; }
        public string webSearchUrl { get; set; }
        public string searchLink { get; set; }
        public Thumbnail2BingVideo thumbnail { get; set; }
    }

    public class Thumbnail3BingVideo
    {
        public string thumbnailUrl { get; set; }
    }

    public class SuggestionBingVideo
    {
        public string text { get; set; }
        public string displayText { get; set; }
        public string webSearchUrl { get; set; }
        public string searchLink { get; set; }
        public Thumbnail3BingVideo thumbnail { get; set; }
    }

    public class PivotSuggestionBingVideo
    {
        public string pivot { get; set; }
        public List<SuggestionBingVideo> suggestions { get; set; }
    }

    public class BingVideoResult
    {
        public string _type { get; set; }
        public InstrumentationBingVideo instrumentation { get; set; }
        public string readLink { get; set; }
        public string webSearchUrl { get; set; }
        public int totalEstimatedMatches { get; set; }
        public List<ValueBingVideo> value { get; set; }
        public int nextOffsetAddCount { get; set; }
        public List<QueryExpansionBingVideo> queryExpansions { get; set; }
        public List<PivotSuggestionBingVideo> pivotSuggestions { get; set; }
    }
    public class BingVideoHelper
    {
        public static async Task<BingVideoResult> Search(string Qry)
        {
            var client = new HttpClient();

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", APPCONTANTS.BING_API_KEY);

            var uri = string.Format("https://api.cognitive.microsoft.com/bing/v5.0/videos/search?q={0}&count={1}&offset={2}&mkt={3}&safeSearch={4}", Qry, 3, 0, "en-us", "Moderate");

            var response = await client.GetAsync(uri);
            var msg = await response.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(msg))
            {
                var hasil = JsonConvert.DeserializeObject<BingVideoResult>(msg);
                return hasil;
            }
            return null;
        }
    }
}

