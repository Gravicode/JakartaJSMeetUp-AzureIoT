using System;
using System.Globalization;
using System.Net.Http.Headers;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace SentimentAnalytic
{
    /// <summary>
    /// This is a sample program that shows how to use the Azure ML Text Analytics app: key phrases, language and sentiment detection. 
    /// </summary>
    static class Program
    {
        /// <summary>
        /// Azure portal URL.
        /// </summary>
        private const string BaseUrl = "https://westus.api.cognitive.microsoft.com/";

        /// <summary>
        /// Your account key goes here.
        /// </summary>
        private const string AccountKey = "a3b5cae52b4e4c9da87923a053d24b9c";

        /// <summary>
        /// Maximum number of languages to return in language detection API.
        /// </summary>
        private const int NumLanguages = 1;

        static void Main()
        {
            MakeRequests();
            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
        }

        static async void MakeRequests()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);

                // Request headers.
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", AccountKey);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // Request body. Insert your text data here in JSON format.
                byte[] byteData = Encoding.UTF8.GetBytes("{\"documents\":[" +
                    "{\"id\":\"1\",\"text\":\"this is crazy dog and mother fucker\"}," +
                    "{\"id\":\"2\",\"text\":\"hello foo world\"}," +
                    "{\"id\":\"three\",\"text\":\"hello my world\"},]}");

                // Detect key phrases:
                var uri = "text/analytics/v2.0/keyPhrases";
                var response = await CallEndpoint(client, uri, byteData);
                Console.WriteLine("\nDetect key phrases response:\n" + response);

                // Detect language:
                var queryString = HttpUtility.ParseQueryString(string.Empty);
                queryString["numberOfLanguagesToDetect"] = NumLanguages.ToString(CultureInfo.InvariantCulture);
                uri = "text/analytics/v2.0/languages?" + queryString;
                response = await CallEndpoint(client, uri, byteData);
                Console.WriteLine("\nDetect language response:\n" + response);

                // Detect sentiment:
                uri = "text/analytics/v2.0/sentiment";
                response = await CallEndpoint(client, uri, byteData);
                Console.WriteLine("\nDetect sentiment response:\n" + response);
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