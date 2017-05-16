using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace BasicBot
{
    public class Surah
    {
        public int idx { get; set; }
        public int totalayah { get; set; }
        public string name { get; set; }
        public string latin { get; set; }
        public string place { get; set; }
    }

    public class Quran
    {
        public static async Task<Surah> GetSurah(int Index)
        {
            var client = new HttpClient();
            var uri = $"http://qurandataapi.azurewebsites.net/api/Surah/GetSurahByIndex?Index={Index}";

            var response = await client.GetAsync(uri);
            var msg = await response.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(msg))
            {
                var hasil = JsonConvert.DeserializeObject<Surah>(msg);
                return hasil;
            }
            return null;
        }
    }
}