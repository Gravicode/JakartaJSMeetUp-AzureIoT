using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SmartAssistant
{

    public class InsightsSourcesSummary
    {
        public int shoppingSourcesCount { get; set; }
        public int recipeSourcesCount { get; set; }
    }

    public class ValueBingImage
    {
        public string name { get; set; }
        public string webSearchUrl { get; set; }
        public string webSearchUrlPingSuffix { get; set; }
        public string thumbnailUrl { get; set; }
        public string datePublished { get; set; }
        public string contentUrl { get; set; }
        public string hostPageUrl { get; set; }
        public string hostPageUrlPingSuffix { get; set; }
        public string contentSize { get; set; }
        public string encodingFormat { get; set; }
        public string hostPageDisplayUrl { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public ThumbnailBing thumbnail { get; set; }
        public string imageInsightsToken { get; set; }
        public InsightsSourcesSummary insightsSourcesSummary { get; set; }
        public string imageId { get; set; }
        public string accentColor { get; set; }
    }

    public class Thumbnail2
    {
        public string thumbnailUrl { get; set; }
    }

    public class QueryExpansionBing
    {
        public string text { get; set; }
        public string displayText { get; set; }
        public string webSearchUrl { get; set; }
        public string webSearchUrlPingSuffix { get; set; }
        public string searchLink { get; set; }
        public Thumbnail2 thumbnail { get; set; }
    }

    public class Thumbnail3
    {
        public string thumbnailUrl { get; set; }
    }

    public class Suggestion
    {
        public string text { get; set; }
        public string displayText { get; set; }
        public string webSearchUrl { get; set; }
        public string webSearchUrlPingSuffix { get; set; }
        public string searchLink { get; set; }
        public Thumbnail3 thumbnail { get; set; }
    }

    public class PivotSuggestion
    {
        public string pivot { get; set; }
        public List<Suggestion> suggestions { get; set; }
    }

    public class BingImageResult
    {
        public string _type { get; set; }
        public Instrumentation instrumentation { get; set; }
        public string readLink { get; set; }
        public string webSearchUrl { get; set; }
        public string webSearchUrlPingSuffix { get; set; }
        public int totalEstimatedMatches { get; set; }
        public List<ValueBingImage> value { get; set; }
        public List<QueryExpansionBing> queryExpansions { get; set; }
        public int nextOffsetAddCount { get; set; }
        public List<PivotSuggestion> pivotSuggestions { get; set; }
        public bool displayShoppingSourcesBadges { get; set; }
        public bool displayRecipeSourcesBadges { get; set; }
    }
    public class BingImagesHelper
    {
        public static async Task<BingImageResult> Search(string Qry)
        {
            var client = new HttpClient();

            // Request headers

            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", APPCONTANTS.BING_API_KEY);


            var uri = string.Format("https://api.cognitive.microsoft.com/bing/v5.0/images/search?q={0}&count={1}&offset={2}&mkt={3}&safeSearch={4}", Qry, 3, 0, "en-us", "Moderate");

            var response = await client.GetAsync(uri);
            var msg = await response.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(msg))
            {
                var hasil = JsonConvert.DeserializeObject<BingImageResult>(msg);
                return hasil;
            }
            return null;
        }
    }
}
