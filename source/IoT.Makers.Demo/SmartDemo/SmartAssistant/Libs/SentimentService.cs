using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Diagnostics;
namespace SmartAssistant
{
    public class Document
    {
        public double score { get; set; }
        public string id { get; set; }
    }

    public class SentimentResponse
    {
        public List<Document> documents { get; set; }
        public List<object> errors { get; set; }
    }

    public class SentimentService
    {
        /// <summary>
        /// Azure portal URL.
        /// </summary>
        private const string BaseUrl = "https://westus.api.cognitive.microsoft.com/";

        /// <summary>
        /// Your account key goes here.
        /// </summary>
     

        /// <summary>
        /// Maximum number of languages to return in language detection API.
        /// </summary>
        private const int NumLanguages = 1;



        public static async Task<SentimentResponse> GetSentiment(string Message)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BaseUrl);

                    // Request headers.
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", APPCONTANTS.TEXTANALYSIS_KEY);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // Request body. Insert your text data here in JSON format.
                    byte[] byteData = Encoding.UTF8.GetBytes("{\"documents\":[" +
                        "{\"id\":\"1\",\"text\":\"" + Message + "\"}]}");
                    /*
                    // Detect key phrases:
                    var uri = "text/analytics/v2.0/keyPhrases";
                    var response = await CallEndpoint(client, uri, byteData);
                    Debug.WriteLine("\nDetect key phrases response:\n" + response);

                    // Detect language:
                    var queryString = HttpUtility.ParseQueryString(string.Empty);
                    queryString["numberOfLanguagesToDetect"] = NumLanguages.ToString(CultureInfo.InvariantCulture);
                    uri = "text/analytics/v2.0/languages?" + queryString;
                    response = await CallEndpoint(client, uri, byteData);
                    Debug.WriteLine("\nDetect language response:\n" + response);
                    */
                    // Detect sentiment:
                    var uri = "text/analytics/v2.0/sentiment";
                    var response = await CallEndpoint(client, uri, byteData);
                    var item = JsonConvert.DeserializeObject<SentimentResponse>(response);
                    Debug.WriteLine("\nDetect sentiment response:\n" + response);
                    return item;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return null;
            }
        }

        static async Task<String> CallEndpoint(HttpClient client, string uri, byte[] byteData)
        {
            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var response = await client.PostAsync(uri, content);
                return await response.Content.ReadAsStringAsync();
            }
        }
    }
}
