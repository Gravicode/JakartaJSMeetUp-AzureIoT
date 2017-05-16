using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace SmartAssistant
{
    public class Intent
    {
        public string intent { get; set; }
        public double score { get; set; }
    }

    public class Entity
    {
        public string entity { get; set; }
        public string type { get; set; }
        public int startIndex { get; set; }
        public int endIndex { get; set; }
        public double score { get; set; }
    }

    public class LuisObj
    {
        public string query { get; set; }
        public List<Intent> intents { get; set; }
        public List<Entity> entities { get; set; }
    }

    public class LuisResult
    {
        public bool IsSucceed { set; get; }
        public string Command { set; get; }
        public string Value { set; get; }

    }
    public class LuisHelper
    {
        readonly string UrlLuis = $"https://api.projectoxford.ai/luis/v1/application?id={APPCONTANTS.LUIS_APP_ID}&subscription-key={APPCONTANTS.LUIS_SUB_KEY}&q=";
        public async Task<LuisResult> GetIntent(string CommandStr)
        {
            var res = new LuisResult() { IsSucceed = false, Value = "", Command = "none" };
            try
            {
                using (var httpClient = new HttpClient())
                {

                    var json = await httpClient.GetStringAsync(UrlLuis + CommandStr);
                    if (!string.IsNullOrEmpty(json))
                    {
                        var obj = JsonConvert.DeserializeObject<LuisObj>(json);
                        if (obj.intents != null && obj.intents.Count > 0 && obj.entities != null && obj.entities.Count > 0)
                        {
                            res.Command = obj.intents[0].intent;
                            res.Value = obj.entities[0].entity;
                            res.IsSucceed = true;
                        }
                    }
                }
            }
            catch { }

            return res;
            // Now parse with JSON.Net

        }
    }
}
