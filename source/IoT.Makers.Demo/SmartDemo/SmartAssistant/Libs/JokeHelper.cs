using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SmartAssistant
{
    public class Jokes
    {
        public int id { get; set; }
        public string joke { get; set; }
        public List<object> categories { get; set; }
    }

    public class JokeObj
    {
        public string type { get; set; }
        public Jokes value { get; set; }
    }

    public class JokeHelper
    {
        public static async Task<JokeObj> GetJoke()
        {
            var client = new HttpClient();
            var uri = "http://api.icndb.com/jokes/random";

            var response = await client.GetAsync(uri);
            var msg = await response.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(msg))
            {
                var hasil = JsonConvert.DeserializeObject<JokeObj>(msg);
                return hasil;
            }
            return null;
        }
    }
}
